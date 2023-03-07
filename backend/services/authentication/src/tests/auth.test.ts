require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose, { mongo } from "mongoose"
import {app} from '../app';

const AUTH_SERVICE_DB_URI = process.env.AUTH_SERVICE_DB_URI || ""
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect(AUTH_SERVICE_DB_URI)
})

describe("Register Unit Tests", () => {

    it("Register API with valid data", async () => {

        const validRegisterData = [{username: "testuser09", email: "testusre09@gmail.com", password: "123mini123"}]

        for(const body of validRegisterData) {
            const response = await request(app).post(`http;//localhost:5400/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(StatusCodes.CREATED);
        }

    })

    it("Registe with invalid data", async () => {

    })

    it("Register with missing e-mail address", async () => {

    })


})

describe("Login API Unit Tests", () => {
    
})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});