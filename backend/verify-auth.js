const jwt = require('jsonwebtoken');
const Customer = require('./services/authentication/models/customer-model')

module.exports.verifyUserAuth = async (request, response, next) => {
    
    try {
        let token;

        // Verify the header
    } 
    
    catch(error) {

    }
    
}

module.exports.restrictRolesTo = (...currentRoles) => {
    return (request, response, next) => {
        // Check to see if the current customer has the current specified role in the middleware
    }
}