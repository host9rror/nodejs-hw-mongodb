import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Validation Error', {
      errors: err.details.map(detail => ({
        message: detail.message,
        path: detail.path,
      })),
    });
    next(error);
  }
};


