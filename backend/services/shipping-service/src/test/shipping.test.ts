require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
   // Connect to the shipping database
})

describe("Create Shipping Details Test Suite", () => {
    it("Create New Shipping Details With Valid Details - Unit Test 1", async () => {

    })

    it("Create Shipping Details - Missing ADDRESS Entry", async () => {

    })

    it("Create Shipping Details Unit Tests - Missing City Entry", async () => {

    })

    it("Create Shipping Details Unit Tests - Invalid Data Type for Address Field", async () => {
        
    })


})