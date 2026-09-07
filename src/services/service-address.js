import { validate } from "../validation/validation.js";
import { prisma } from "../application/database.js";
import { responseError } from "../error/error-response.js";
import { logger } from "../application/logging.js";
import { getContactValidation } from "../validation/validation-contact.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/validation-address.js";

const validateContactId = async (user, contactId) => {
  const validContactId = await validate(getContactValidation, contactId);

  const checkContactInDb = await prisma.contact.count({
    where: {
      username: user.username,
      id: validContactId,
    },
  });

  if (checkContactInDb !== 1) {
    throw new responseError(404, "contact not found");
  }

  return validContactId;
};

const create = async (user, contactId, request) => {
  const validContactId = await validateContactId(user, contactId);

  const validAddress = await validate(createAddressValidation, request);
  validAddress.contactId = validContactId;

  return await prisma.address.create({
    data: validAddress,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
      contactId: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  const validContactId = await validateContactId(user, contactId);

  const validAddressId = await validate(getAddressValidation, addressId);
  const checkAddressInDB = await prisma.address.findFirst({
    where: {
      id: validAddressId,
      contactId: validContactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
      contactId: true,
    },
  });

  if (!checkAddressInDB) {
    throw new responseError(404, "address not found");
  }

  return checkAddressInDB;
};

const update = async (user, contactId, request) => {
  const validContactId = await validateContactId(user, contactId);

  const validAddress = validate(updateAddressValidation, request);

  const checkAddressInDB = await prisma.address.count({
    where: {
      id: validAddress.id,
      contactId: validContactId,
    },
  });

  if (checkAddressInDB !== 1) {
    throw new responseError(404, "address not found");
  }

  return await prisma.address.update({
    where: {
      id: validAddress.id,
    },
    data: validAddress,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
      contactId: true,
    },
  });
};

const remove = async (user, contactId, addressId) => {
  const validContactId = await validateContactId(user, contactId);
  const validAddressId = await validate(getAddressValidation, addressId);
  const checkAddressInDB = await prisma.address.count({
    where: {
      id: validAddressId,
      contactId: validContactId,
    },
  });

  if (checkAddressInDB !== 1) {
    throw new responseError(404, "address not found");
  }

  return await prisma.address.delete({
    where: {
      id: validAddressId,
    },
    select: {
      id: true,
      contactId: true,
      contact: {
        select: {
          firstName: true,
        },
      },
    },
  });
};

const list = async (user, contactId) => {
  const validContactId = await validateContactId(user, contactId);
  const checkAddressesInDB = await prisma.address.findMany({
    where: {
      contactId: validContactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
      contactId: true,
    },
  });

  return checkAddressesInDB;
};

export default { create, get, update, remove, list };
