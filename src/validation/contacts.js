import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).pattern(/^[0-9]+$/).min(10).max(15).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20).pattern(/^[0-9]+$/).min(10).max(15),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
});