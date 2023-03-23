require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';

beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-coupons-schema.irvhiwg.mongodb.net/?retryWrites=true&w=majority")
})

describe("Fetch Valid Coupons Unit Tests", () => {

    it("Fetch Valid Coupons - Unit Test 1", async () => {

    })

    it("Create New Coupon - Missing Data", async () => {

    })

    it("Create New Coupon - Expired Coupon", async () => {

    })

    it("Edit Coupon Details - Valid Coupon Data", async () => {

    })

    it("Edit Coupon Details - Editing expired coupon test", async () => {
        
    })

})