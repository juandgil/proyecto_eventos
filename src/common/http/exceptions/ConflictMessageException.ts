import { ErrorCode, StatusCode } from './ErrorCode';
import Exception from './Exceptions';

export default class ConflictMessageException extends Exception {
    constructor(cause: string, message: string) {
        super(message, ErrorCode.BAD_MESSAGE, StatusCode.CONFLICT, cause);
    }
}
