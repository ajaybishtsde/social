class AppError extends Error {
  statusCode: number;
  status: boolean | string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? false : 'error';
  }
}
export default AppError;
