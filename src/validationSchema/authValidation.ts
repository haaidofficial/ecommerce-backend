import Joi from 'joi';

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');

const messages = {
    name: {
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters'
    },
    email: {
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
    },
    password: {
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be at least 8 characters long and include at least one Uppercase letter, one Lowercase letter, one Number and one Special character'
    }
}

export const userRegisterSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .messages(messages.name)
        .required(),
    email: Joi
        .string()
        .email()
        .messages(messages.email)
        .required(),
    password: Joi
        .string()
        .pattern(passwordRegex)
        .messages(messages.password)
        .required()
});

export const loginSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required()
        .messages(messages.email),
    password: Joi
        .string()
        .pattern(passwordRegex)
        .required()
        .messages(messages.password)
});