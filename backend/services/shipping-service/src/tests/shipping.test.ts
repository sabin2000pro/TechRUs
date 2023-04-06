require('dotenv').config();
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app'
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-shipping-schema.8b7xh9h.mongodb.net/?retryWrites=true&w=majority")
})

describe("Create Shipping Details Test Suite", () => {
    
    it("Create New Shipping Details With Valid Details - Unit Test 1", async () => {
       try {

            const shippingBody = [{
                user: "63e25f48d82eb035f7dc0652",
                address: "190 High Road",
                city: "Edinburgh",
                country: "United Kingdom",
                postalCode: "EH17 ABC",
                phoneNo: "9348324"
            }]

            for (const bodyData of shippingBody) {
                const response = await request(app).post(`/api/v1/auth/shipping`).send(bodyData);
                return expect(response.statusCode).toBe(201);
            }

       } 
       
       catch(error) {

       }
    })

    it("Create Shipping Details - Missing ADDRESS Entry", async () => {
        try {

        } 
        
        catch(error) {

        }


    })

    it("Create Shipping Details Unit Tests - Missing City Entry", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

    it("Create Shipping Details Unit Tests - Invalid Data Type for Address Field", async () => {
        try {

        }
        
        catch(error) {

        }
    })


})