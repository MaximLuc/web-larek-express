class ConflictError extends Error {
  statusCode: number;

  constructor(message = 'ошибка при создании товара с уже существующим полем title') {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
