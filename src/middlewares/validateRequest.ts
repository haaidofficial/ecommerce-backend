import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, StringSchema } from 'joi';
import AppError from '../utils/appError';

const createValidator = (property: 'body' | 'params' | 'query') => {
    return (schema: ObjectSchema | StringSchema) => (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            return next(new AppError(error.details.map(detail => detail.message).join(','), 400));
        }
        next();
    }
}

export const validateRequest = createValidator('body');
export const validateRequestParams = createValidator('params');
export const validateRequestQuery = createValidator('query');