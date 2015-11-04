export class ValidationError extends Error {
    name = 'ValidationError'
    status = 400

    constructor(error) {
        super(error.message);
        this.payload = {
            ...error,
            name: this.name
        };
    }
}

export class ControllerValidationError extends Error {
    name = 'ControllerValidationError';
    status = 400;

    constructor(errorMessage) {
        super(errorMessage);
        this.message = errorMessage;
    }
}


export class RequestError extends Error {
    name = 'RequestError'
    status = 400
}

export class AuthenticationError extends Error {
    name = 'AuthenticationError'
    message = 'You need to authenticate to access this resource'
    status = 401
}

export class NotFoundError extends Error {
    name = 'NotFoundError'
    message = 'Could not find the entity';
    status = 404;
}

export function errorMiddleware(err, req, res, next) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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
