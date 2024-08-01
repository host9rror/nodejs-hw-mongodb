import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 400,
            message: 'Invalid ID format',
            data: err.message,
        });
    }

    return res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });
};
