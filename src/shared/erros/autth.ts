import { AppError } from './error'

export class AppAuthNegate extends AppError {
  constructor(message: string) {
    super(message, 401)
  }
}

export class AppAuthForbiden extends AppError {
  constructor(message: string) {
    super(message, 403)
  }
}
