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
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const ContactsCollection = model('contacts', contactsSchema);
