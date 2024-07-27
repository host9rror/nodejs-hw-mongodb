import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true, 
        },
        phoneNumber: {
            type: String,
            required: true, 
        },
        email: {
            type: String,
            required: false, 
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'], 
            required: true,
            default: 'personal',
        }
    },
    {
        timestamps: true,
    }
);

export const ContactsCollection = model('contacts', contactsSchema);