require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-auth-schema.mfj4iaa.mongodb.net/?retryWrites=true&w=majority")
})

describe("Register Unit Tests", () => {

    it("Register API with valid data", async () => {

        const validRegisterData = [{username: "testuser09", email: "testusre09@gmail.com", password: "123mini123"}]

        for(const body of validRegisterData) {
            const response = await request(app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(StatusCodes.CREATED);
        }

    })

    it("Register API with missing username", async () => {
        const validRegisterData = [{email: "testusre09@gmail.com", password: "123mini123"}]

        for(const body of validRegisterData) {
            const response = await request(app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        }

    })

    it("Register with missing e-mail address", async () => {

         const validRegisterData = [{username: "user092", password: "123mini123"}]

        for(const body of validRegisterData) {
            const response = await request(app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        }

    })

    it("Register API with invalid e-mail address", async () => {
        const validRegisterData = [{username: "user092", email: "nfj", password: "123mini123"}]

        for(const body of validRegisterData) {
            const response = await request(app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        }

    })


})

describe("Login API Unit Tests", () => {
    
})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});