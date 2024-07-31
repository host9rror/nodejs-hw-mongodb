import { HttpError } from 'http-errors'

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(500).json({
            status: err.status,
            message: err.name,
            error: err.message,
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });
};

export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
};