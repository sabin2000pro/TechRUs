require('dotenv').config();
const mongoose = require('mongoose');
const AUTH_DB_URI = process.env.AUTH_DB_URI;

module.exports.connectAuthDatabase = async () => {

    try {

        return await mongoose.connect(AUTH_DB_URI).then(authConnection => {

            if(authConnection.connection) {
                return console.log(`Connected to the auth database succesfully`)
            }

            else {
                return console.log(`Could not connect to auth database successfully`);
            }

        })


    }
    
    catch(error) {
        
        if(error) {
            return console.error(error);
        }

    }


}