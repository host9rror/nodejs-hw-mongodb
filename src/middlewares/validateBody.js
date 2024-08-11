import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (err) {
    if (err.isJoi) {
      const errors = err.details.map((detail) => ({
        message: detail.message,
        path: detail.path.join('.'),
        type: detail.type,
      }));

      const errorMessages = errors.map((error) => `${error.path}: ${error.message}`);
      const errorMessage = `Invalid request body. The following fields are invalid:\n${errorMessages}`;

      const error = createHttpError(400, errorMessage, {
        errors,
      });
      next(error);
    } else {
      next(err);
    }
  }
};