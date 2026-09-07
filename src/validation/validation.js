import { responseError } from "../error/error-response.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new responseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
