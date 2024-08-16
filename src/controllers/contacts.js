import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    patchContact
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId
    });

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
  
    try {
      const contact = await getContactById(contactId, userId);
  
      if (!contact) {
        return next(createHttpError(404, 'Contact not found'));
      }
  
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        return next(createHttpError(404, 'Contact not found'));
      }
      next(err);
    }
  };

export const createContactController = async (req, res, next) => {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const userId = req.user._id; 

    if (!name || !phoneNumber || !contactType) {
        return next(createHttpError(400, 'Missing required fields'));
    }

    try {
        const contact = await createContact({ name, phoneNumber, email, isFavourite, contactType, userId });
        res.status(201).json({
            status: 201,
            message: 'Successfully created a contact!',
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};


export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id; 

    try {
        const result = await patchContact(contactId, req.body, {}, userId);

        if (!result) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.json({
            status: 200,
            message: 'Successfully patched a contact!',
            data: result.contact,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id; 

    try {
        const contact = await deleteContact(contactId, userId);

        if (!contact) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};