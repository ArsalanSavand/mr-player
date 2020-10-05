import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiError } from '@app/interfaces/api-error';

export class HttpErrorResponseApi extends HttpErrorResponse {
  readonly error: ApiError;
  /**
   * Prevent Sentry from capturing this error.
   *
   * @see SentryErrorHandler.handleError
   */
  preventSentryCapture: boolean;

  constructor(init: {
    error?: ApiError;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }) {
    super(init);
  }
}
