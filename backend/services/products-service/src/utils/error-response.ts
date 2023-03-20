
class ErrorResponse extends Error {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message) // Inherit the message from the base error class
        this.statusCode = statusCode;
    }
}

export {ErrorResponse}