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

    })

})

describe("Fetch Product By ID Test Suite ", () => {

    it("Fetch Single Product By ID - Unit Test", async () => {
        try {

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

    })
})