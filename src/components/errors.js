export class ValidationError extends Error {
    name = 'ValidationError'
    message = 'Validation failed.'
    status = 400

    constructor(errors) {
        super();
        this.payload = {
            name: this.name,
            message: this.message,
            errors: this.errors
        };
    }
}

export class RequestError extends Error {
    name = 'RequestError'
    status = 400
}

export class NotFoundError extends Error {
    name = 'NotFoundError'
    message = 'Could not find the entity';
    status = 404;
}

export function errorMiddleware(err, req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        console.log(err.stack);
    }

    const status = err.status || 500;

    return res
        .status(status)
        .json(err.payload || {
            name: err.name,
            message: err.message
        });
}

export function pageNotFoundMiddleware(req, res) {
    res
        .status(404)
        .json({
            message: 'Page Not Found'
        });
}
