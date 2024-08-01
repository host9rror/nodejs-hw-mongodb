import { ContactsCollection } from "../db/models/contact.js";
import createHttpError from "http-errors";
import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactById = async (id) => {
    const contact = await ContactsCollection.findById(id);
    return contact;
};

export const createContact = async (payload) => {
    const contact  = await ContactsCollection.create(payload);
    return contact;
};

export const patchContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            ...options,
        }
    );

    return rawResult ? { contact: rawResult, isNew: false } : null;
};


export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });

    return contact;
};