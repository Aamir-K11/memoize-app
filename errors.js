class BadRequestError extends Error {
    constructor(message, statusCode) 
    {
        super(message);
        
        this.status = "BadRequestException";
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message, statusCode) 
    {
        super(message);
        
        this.status = "BadRequestException";
        this.statusCode = 401;
    }
}

module.exports = {
    BadRequestError,
    UnauthorizedError
}