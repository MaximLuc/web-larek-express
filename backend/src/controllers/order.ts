import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import validator from 'validator';
import { Error as MongooseError } from 'mongoose';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      throw new BadRequestError('Список товаров не может быть пустым');
    }

    if (typeof total !== 'number') {
      throw new BadRequestError('Некорректная сумма заказа');
    }

    const products = await Product.find({ _id: { $in: items } });

    const calculatedTotal = products.reduce((sum, p) => sum + p.price, 0);

    if (calculatedTotal !== total) {
      throw new BadRequestError('Некорректная сумма заказа');
    }

    if (['card', 'online'].includes(payment) === false) {
      throw new BadRequestError('Некорректный тип оплаты');
    }

    if (!validator.isEmail(email)) {
      throw new BadRequestError('Некорректный email');
    }

    if (typeof phone !== 'string' || !phone.trim()) {
      throw new BadRequestError('Некорректный телефон');
    }

    if (typeof address !== 'string' || !address.trim()) {
      throw new BadRequestError('Некорректный адрес');
    }

    if (products.length !== items.length) {
      throw new NotFoundError('Некоторые товары не найден');
    }

    const notForSale = products.filter((p) => p.price === null);

    if (notForSale.length > 0) {
      throw new BadRequestError('Некоторые товары не доступны для продажи');
    }

    const orderId = faker.string.uuid();
    res.status(201).send({
      orderId,
      total: calculatedTotal,
    });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError(error.message));
    }
    next(error as Error);
  }
};

export default createOrder;
