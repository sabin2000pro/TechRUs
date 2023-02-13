const Customer = require('../models/customer-model');
const jwt = require('jsonwebtoken');

module.exports.verifyUserAuth = async (request, response, next) => {
    try {

    } 
    
    catch(error) {

    }
    
}

module.exports.restrictRolesTo = (...currentRoles) => {
    return (request, response, next) => {
        // Check to see if the current customer has the current specified role in the middleware
    }
}