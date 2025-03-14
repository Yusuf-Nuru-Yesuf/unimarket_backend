import { HttpStatusCode } from '../constants';
import { AppErrorCode } from '../constants';

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCode,
  ) {
    super(message);
  }
}

export default AppError;