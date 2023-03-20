class ErrorResponse extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) { // Error Response constructor for reviews service
        super(message);
        this.statusCode = statusCode;
    }

}

export {ErrorResponse}