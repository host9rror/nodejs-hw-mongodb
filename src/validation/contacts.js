import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean().required(),
    contactType: Joi.string().valid('pesonal', 'home').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('pesonal', 'home'),
});