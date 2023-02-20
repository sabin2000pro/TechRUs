import { CustomerSchema } from './services/authentication/src/models/user-model';
console.log(`Customer Schema: `, CustomerSchema);

export const verifyUserAuth = async (request, response, next) => {
    console.log(`Inside verify user auth middleware`)

    return next();
}