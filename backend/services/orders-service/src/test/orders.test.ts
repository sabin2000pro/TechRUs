require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-order-schema.wdv1cfa.mongodb.net/?retryWrites=true&w=majority")
})

describe("Create New Order Test Suite", () => {

    it("Create order with valid data", async () => {

        const orderTestPayload = { // Order payloat to test

            shippingInformation: {
                user: "63e25f48d82eb035f7dc0652",
                address: "144 High Road",
                city: "Edinburgh",
                phoneNo: "07881391091",
                postalCode: "EH16 7AB",
                country: "United Kingdom"
            },

            orderItems: [{
                name: "iPad Pro 12.9",
                quantity: 2,
                image: "no-photo.jpg",
                price: 3999.99,
                taxPrice: 4.99,
                shippingPrice: 2.99,
                totalPrice: 4006.99,
                product: "63e25f48d82eb035f7da0982",
                _id: "63f388bf2b02ac6637b871bc"
            }],

        };
        
        const orderBodyPayload = [orderTestPayload];

        for(const orderData of orderBodyPayload) {
            const response = await request(app).post(`/api/v1/orders`).send(orderData);
            console.log(`Create Order Response : `, orderData);
            expect(response.statusCode).toBe(StatusCodes.CREATED);
        }

    })

    it("Fetch all orders unit test", async () => {

        try {
            const response = await request(app).get(`/api/v1/orders`).send();
        } 
        
        catch(error) {

           if(error) {
            console.error(error);
            throw new Error(error);
           }

        }

    })

    it("Fetch Order By ID Unit Test", async () => {
        try {

        } 
        
        catch(error) {

        }

    })

    it("Edit order status unit test", async () => {
       const updateOrderStatusPayload = {orderStatus: "completed"}
       const orderResponse = await request(app).put(`/api/v1/orders/5d713995b721c3bb38c1f9c0/update-status`).send(updateOrderStatusPayload);

       expect(orderResponse.statusCode).toBe(StatusCodes.OK)
    })

    it("Create order with INVALID Body data", async () => {

       try {

       } 
       
       catch(error) {

       }
    })

    it("Delete Order Data Unit Test", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

})

afterAll((done) => {
    mongoose.connection.close();
    done();
})