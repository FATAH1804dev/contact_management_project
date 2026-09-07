import serviceContact from "../services/service-contact.js";

const create = async (req, res, next) => {
  try {
    const data = await serviceContact.create(req.user, req.body);

    res.status(200).json({
      data: data,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await serviceContact.get(req.user, req.params.contactId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id = req.params.contactId;
    const result = await serviceContact.update(req.user, req.body);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await serviceContact.remove(req.user, req.params.contactId);

    res.status(200).json({
      data: `${result.firstName} contact with id ${result.id} has been deleted`,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      size: req.query.size,
      page: req.query.page,
    };

    const result = await serviceContact.search(user, request);

    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, search };
