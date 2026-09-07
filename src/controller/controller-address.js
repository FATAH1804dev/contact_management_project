import serviceAddress from "../services/service-address.js";

const create = async (req, res, next) => {
  try {
    const request = {
      street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      postalCode: req.body.postalCode,
    };
    const contactId = req.params.contactId;
    const user = req.user;

    const result = await serviceAddress.create(user, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const contactId = req.params.contactId;
    const user = req.user;

    const result = await serviceAddress.get(user, contactId, addressId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = req.params.addressId;

    const result = await serviceAddress.update(user, contactId, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const addressId = req.params.addressId;

    const result = await serviceAddress.remove(user, contactId, addressId);
    res.status(200).json({
      data: `address ${result.contact.firstName} with id ${result.id} has been deleted`,
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    const result = await serviceAddress.list(user, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, list };
