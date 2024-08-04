export class PostAlreadyExistsError extends Error {
    constructor() { 
        super('Post already exists');
    }
}