import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString({ message: 'first name must be a string' })
  @IsNotEmpty({ message: 'first name is required' })
  readonly firstName: string;

  @Field(() => String)
  @IsString({ message: 'last name must be a string' })
  @IsNotEmpty({ message: 'last name is required' })
  readonly lastName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'bio must be a string' })
  readonly bio: string;
}
