import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { GraphQLExceptionFilter } from './core/utils/exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AppResolver } from './app.resolver';
import helmet from 'helmet';
import configuration from './core/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env',],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      allowBatchedHttpRequests: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      formatError: (error) => {
        return {
          message: error.message,
          path: error.path,
          extensions: {
            code: error.extensions?.code,
            status: error.extensions?.status,
            errors: error.extensions?.errors,
          },
        };
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      sortSchema: true,
    }),
    DatabaseModule,
    UsersModule,
    Web3Module,
  ],
  providers: [
    AppService,
    AppResolver,
    { provide: APP_FILTER, useClass: GraphQLExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(
        helmet({
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: {
            directives: {
              imgSrc: [
                `'self'`,
                'data:',
                'apollo-server-landing-page.cdn.apollographql.com',
              ],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
              manifestSrc: [
                `'self'`,
                'apollo-server-landing-page.cdn.apollographql.com',
              ],
              frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
