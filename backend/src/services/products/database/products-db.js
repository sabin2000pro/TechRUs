const dotenv = require('dotenv');
dotenv.config({path: '/Users/sabin2000/Documents/TechRUs/backend/src/services/products/config.env'})
const mongoose = require('mongoose');
const PRODUCTS_DB_URI = process.env.PRODUCTS_DB_URI

module.exports.connectProductsSchema = async () => {

    try {

        return await mongoose.connect(PRODUCTS_DB_URI).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to the products schema`)
            }

            else {
                return console.log(`Could not connect to the products schema`)
            }

        })
    }
    
    catch(error) {

        if(error) {
            return console.log(error);
        }

    }


}