import { ErrorCode, StatusCode } from './ErrorCode';
import Exception from './Exceptions';

export default class NotFoundException extends Exception {
    constructor(cause: string, message = 'Recurso no encontrado') {
        super(message, ErrorCode.NOT_FOUND, StatusCode.NOT_FOUND, cause);
    }
}
