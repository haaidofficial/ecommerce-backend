import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import AppError from '../utils/appError';

const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(new AppError(error.details.map(detail => detail.message).join(','), 400));
        }
        next();
    }
}

export default validateRequest;