import Joi from 'joi';
import mongoose from 'mongoose';

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
    },
    avatar: {
        'string.pattern.base': 'Avatar must be a valid image path (jpg, jpeg, png, webp)'
    },
    address: {
        street: {
            "string.base": "Street must be a text value",
            "string.empty": "Street is required",
            "any.required": "Street is required",
        },
        city: {
            "string.base": "City must be a text value",
            "string.empty": "City is required",
            "any.required": "City is required",
        },
        zip: {
            "string.base": "ZIP must be a text value",
            "string.empty": "ZIP code is required",
            "any.required": "ZIP code is required",
        },
        country: {
            "string.base": "Country must be a text value",
            "string.empty": "Country is required",
            "any.required": "Country is required",
        }
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

export const updateAccountSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .messages(messages.name)
        .optional(),

    email: Joi
        .string()
        .email()
        .messages(messages.email)
        .optional(),



});

export const addressSchema = Joi.object({
    street: Joi
        .string()
        .messages(messages.address.street)
        .required(),
    city: Joi
        .string()
        .messages(messages.address.city)
        .required(),
    zip: Joi
        .string()
        .messages(messages.address.zip)
        .required(),
    country: Joi
        .string()
        .messages(messages.address.country)
        .required(),
    isDefault: Joi
        .boolean()
        .messages({ "boolean.base": "isDefault must be true or false", })
        .optional()
});

export const addressIdSchema = Joi.object({
    addressId: Joi.string().custom((value, helpers) => {
        debugger
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).messages({ 'any.invalid': 'Invalid address id provided' })
});