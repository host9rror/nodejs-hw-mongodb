import { ContactsCollection } from "../db/models/contact.js";
import createHttpError from "http-errors";
import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
import { parseFilterParams } from '../utils/parseFilterParams.js';


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId, 
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = ContactsCollection.find({ userId }); 

  if (filter.type) {
      contactsQuery = contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== null) {
      contactsQuery = contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find({ userId }) 
      .merge(contactsQuery)
      .countDocuments();

  const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
      data: contacts,
      ...paginationData,
  };
};

export const getContactById = async (id, userId) => {
  const contact = await ContactsCollection.findOne({ _id: id, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};


export const patchContact = async (contactId, payload, options = {}, userId) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, userId }, 
      payload,
      {
          new: true,
          ...options,
      }
  );

  return rawResult ? { contact: rawResult, isNew: false } : null;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
      _id: contactId,
      userId, 
  });

  return contact;
};
