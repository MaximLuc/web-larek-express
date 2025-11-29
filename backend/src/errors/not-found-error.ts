class NotFoundError extends Error {
  statusCode: number;

  constructor(message = 'маршрут не найден') {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
