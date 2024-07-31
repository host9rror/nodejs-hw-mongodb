import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js";

export const getAllContactsController = async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
  
      res.json({
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts,
      });
    } catch(err) {
        next(err);
    }
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Student not found')
    }

    res.json({
        status: 200,
        message: `Successfully found contact width id ${contactId}`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.body;
    const result = await patchContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Ccontact not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,
    })
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
}