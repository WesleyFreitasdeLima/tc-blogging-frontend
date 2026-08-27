import { AppError } from './error'

export class AppRegraNegocio extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}
