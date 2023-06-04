import HttpStatus from 'http-status-codes';
import { ValidationError } from 'yup'

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  console.log(err.errors)
  // Validation errors
  if (err instanceof ValidationError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      values: err.value,
      details: err.errors,
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
