import Joi from "joi";

const createContactValidation = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(20).email().optional(),
  phone: Joi.string().max(100).optional(),
});

const getContactValidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(20).email().optional(),
  phone: Joi.string().max(100).optional().empty("").default(null),
});

const searchContactValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  size: Joi.number()
    .min(1)
    .max(100)
    .positive()
    .empty("")
    .default(10)
    .optional(),
  page: Joi.number().min(1).positive().empty("").default(1).optional(),
});

export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
};
