require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-products-db.fy1yivg.mongodb.net/?retryWrites=true&w=majority")
})

describe("Fetch All Products Test Suite", () => {

    it("Fetch All Products - Unit Test 1", async () => {
        try {
            const allProductsResponse = await request(app).get(`/api/v1/products`);
            const currentProduct = allProductsResponse.body.products[0];
            console.log(`Current product : `, currentProduct);
            
            expect(currentProduct).toHaveProperty("_id");
            expect(currentProduct).toHaveProperty("description");
            expect(currentProduct).toHaveProperty("stockCount");
            expect(currentProduct.stockCount).toBeGreaterThan(0)
            expect(allProductsResponse.body.products.length).toBeGreaterThan(0); // Check to see if we have products available
            expect(allProductsResponse.statusCode).toBe(StatusCodes.OK);
        } 
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }


        }
    })

})

describe("Fetch Product By ID Test Suite ", () => {

    it("Fetch Single Product By ID - Unit Test", async () => {

        try {
            const productResponse = await request(app).get(`/api/v1/products/642a9d2201d0c6b3bc8155a2`);
            const productIdValid = mongoose.Types.ObjectId.isValid("642a9d2201d0c6b3bc8155a2");
            expect(productIdValid).toBe(true);

            expect(productResponse.body.product).toHaveProperty('stockCount')
            expect(productResponse.statusCode).toBe(StatusCodes.OK);
            expect(productResponse.body.product.stockCount).toBeGreaterThan(0);

        } 
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }

        }


    })
})

describe("Create New Product - Unit Test Suite", () => {

    it("Create New Product - Valid Data", async () => {

        try {

            const productBodyData = [{
                name: 'Apple Watch Series 8',
                description: 'The latest and most advanced Apple Apple Watch. Perfect for your workouts',
                warranty: '2 Years',
                image: '/images/series-8.jpg',
                price: 899.99,
                stockCount: 2,
                lowStockAlert: 1,
                isNew: true,
            }]

            for(const productData of productBodyData) {
                const productResponse = await request(app).post(`/api/v1/products`).send(productData);
                expect(productResponse.statusCode).toBe(StatusCodes.CREATED);
                expect(productResponse.body.product).toHaveProperty("name");
            }


        } 
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }

        }

    })

    it("Create Product - Missing Stock Count Unit Test", async () => {
        try {
            const productPayload = [{
                
            }]
        }     
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }

        }


    })

    it("Create Product - Missing Name And Description - Unit Test", async () => {
        try {

            const productPayload = [{
                warranty: '2 Years',
                image: '/images/series-8.jpg',
                price: 899.99,
                stockCount: 2,
                lowStockAlert: 1,
                isNew: true,
            }]

            for(const data of productPayload) {
                const productResponse = await request(app).post(`/api/v1/products`).send(data);
                expect(productResponse.statusCode).toBe(StatusCodes.BAD_REQUEST);
            }
        } 
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }

        }


    })

    it("Edit Product By ID - Valid Body Data Unit Test", async () => {
        try {

            const editProductBodyData = {
                name: "iPhone X"
            }

            const editProductResponse = await request(app).put(`/api/v1/products/642a9d2201d0c6b3bc8155a1`).send(editProductBodyData);
            expect(editProductResponse.statusCode).toBe(StatusCodes.OK);
            expect(editProductResponse.body.product).toHaveProperty("name");
        } 
        
        catch(error) {    

            if(error) {
                throw new Error(error);
            }
        }

    })
})

// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close(); // Close the mongodb connection
    done()
});