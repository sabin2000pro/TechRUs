require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-auth-schema.mfj4iaa.mongodb.net/?retryWrites=true&w=majority")
})

describe("Create New Order Test Suite", () => {

    it("Create order with valid data", async () => {

        const orderTestPayload = { // Order payloat to test

            customer: "customer_id",

            shippingInformation: {
                address: "144 High Road",
                city: "Edinburgh",
                phoneNo: "07881391091",
                postalCode: "EH16 7AB",
                country: "United Kingdom"
            },

            orderItems: [{
                name: "iPad Pro 12.9",
                quantity: 1,
                image: "no-photo.jpg",
                price: 3999.99,
                product: "63e25f48d82eb035f7da0982",
                _id: "63f388bf2b02ac6637b871bc"
            }],

            orderStatus: "received",

            paymentInformation: {
                id: "payment_id",
                status: "received"
            },

            itemPrice: 3999.99,
            taxPrice: 4.99,
            shippingPrice: 2.99,
            totalPrice: 4006.99
        };
        
        const orderBodyPayload = [orderTestPayload];

        for(const orderData of orderBodyPayload) {
            const response = await request(app).post(`/api/v1/orders`).send(orderData);
            return expect(response.statusCode).toBe(StatusCodes.CREATED);
        }
    })

    it("Fetch all orders unit test", async () => {

        try {
            const response = await request(app).get(`/api/v1/orders`).send();
            return expect(response.statusCode).toBe(StatusCodes.OK);
        } 
        
        catch(error) {

           if(error) {
              return console.error(error);
           }

        }

    })

    it("Update order status unit test", async () => {
       const updateOrderStatusPayload = {orderStatus: ""}
    })

    it("Create order with invalid data", async () => {

    })

})