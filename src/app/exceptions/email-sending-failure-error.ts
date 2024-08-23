export class EmailSendingFailureError extends Error {
    constructor() { 
        super('email sending failure');
    }
}