class BadRequestError extends Error {
  statusCode: number;

  constructor(message = 'Переданы некорректные данные в методы создания товараб заказа') {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
