import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/product';

const getProducts = (_req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products) => {
      res.send({ items: products, total: products.length });
    })
    .catch(next);
};

const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  Product.create({
    title, image, category, description, price,
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => {
      if (error instanceof MongooseError.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании товара'));
      }

      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new BadRequestError('Товар с таким названием уже существует'));
      }

      return next(error);
    });
};

export { getProducts, createProduct };
