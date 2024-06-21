import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

// Define un diccionario de errores comunes
const errorDictionary = {
  'ValidationError': 'Error de validación: por favor revise los datos enviados.',
  'CastError': 'Error de conversión: por favor revise los tipos de datos enviados.',
  'MongoServerError': 'Error de base de datos: ocurrió un problema al registrar la información.',
  'UnauthorizedException': 'Error de autenticación: credenviales no válidas.',
  'NotFoundException': 'Error de consulta: elemento no encontrado.',
  'BadRequestException': 'Error en la solicitud: por favor revise los datos enviados.',
  'ForbiddenException': 'Error de acceso: no tiene permisos para realizar esta operación.',
  // Agrega más errores según sea necesario
};

@Catch()
export class ErrorMiddleware implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    // Obtén el contexto de la respuesta HTTP
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getStatus(error);

    // Obtén el mensaje de error del diccionario o usa un mensaje genérico si no está definido
    const message = errorDictionary[error.name] || 'Ocurrió un error en el servidor.';

    // Devuelve una respuesta JSON con el mensaje de error y el código de estado
    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }

  private getStatus(error: Error): number {
    // Asigna códigos de estado de HTTP apropiados según el tipo de error
    if (error.name === 'ValidationError') {
      return HttpStatus.BAD_REQUEST;
    } else if (error.name === 'CastError') {
      return HttpStatus.BAD_REQUEST;
    } else if (error.name === 'MongoError') {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    // Agrega más casos según sea necesario

    // Por defecto, devuelve 500 Internal Server Error para otros tipos de error no manejados
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
