import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong. Try again later';
    let errors = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();

      if (
        status === HttpStatus.BAD_REQUEST &&
        Array.isArray(exceptionResponse.message)
      ) {
        message = 'Validation errors';
        errors = this.formatValidationErrors(exceptionResponse.message);
      } else {
        message =
          exceptionResponse.message ||
          exception.message ||
          'Something went wrong. Try again later';
      }
    }

    throw new GraphQLError(message, {
      extensions: {
        code: this.mapHttpStatusToCode(status),
        status,
        errors,
      },
    });
  }

  private formatValidationErrors(errors: any[]): any[] {
    return errors.map((err) => ({
      path: err.property,
      message: Object.values(err.constraints)[0] as string,
    }));
  }

  private mapHttpStatusToCode(status: number): string {
    const statusCodeMap: { [key: number]: string } = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
    };

    return statusCodeMap[status] || 'INTERNAL_SERVER_ERROR';
  }
}
