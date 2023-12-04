import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const logger = new Logger('PrismaExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = '';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2002': {
        message = `Please, check the entered data for uniqueness.`;
        status = HttpStatus.CONFLICT;

        break;
      }
      case 'P2003': {
        message = `Check the correctness of the input.`;
        status = HttpStatus.BAD_REQUEST;

        break;
      }
      case 'P2025': {
        message = `An operation failed because it depends on one or more records that were required but not found.`;
        status = HttpStatus.NOT_FOUND;

        break;
      }
      default:
        message = `An unhandled DB exception occured`;

        break;
    }

    logger.error(`${message}, code: ${exception.code}`);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
