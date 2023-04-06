require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from "supertest"
import mongoose from "mongoose"
import {app} from '../app';
 
// Establish connection to the authentication service database before running all the tests
beforeAll(async () => {
    return await mongoose.connect("mongodb+srv://sabin2000:123mini123@techrus-auth-schema.mfj4iaa.mongodb.net/?retryWrites=true&w=majority")
})

describe("Register Unit Tests", () => { // Unit Test Suite 1

    it("Register API with valid data", async () => { // Test 1: Register User Account with valid credentials

        const validRegisterData = [{username: "staffacount09", email: "staffacount09@gmail.com", password: "123mini123"}]

        for(const body of validRegisterData) {
            
            const response = await request(app).post(`/api/v1/auth/register`).send(body);
            expect(response.body).toHaveProperty("token");
            expect(response.body).toHaveProperty("user");
            expect(response.statusCode).toBe(StatusCodes.CREATED);
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

        const validRegisterData = [{username: "user092", email: "nfioij", password: "123mini123"}]

        for(const body of validRegisterData) {
            const response = await request(app).post(`/api/v1/auth/register`).send(body);
            expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);

        }

    })

})

describe("Login API Unit Tests", () => {

    it("Login with valid details", async () => {

       const loginPayload = [{email: "staffmember123@gmail.com", password: "staff123"}]

       for(const body of loginPayload) {
         const loginResponse = await request(app).post(`/api/v1/auth/login`).send(body);         
         return expect(loginResponse.statusCode).toBe(StatusCodes.OK)
       }

    })

    it("Login with invalid password", async () => {

        const loginPayload = [{email: "staffmember123@gmail.com", password: "staff1232388"}]

        for(const body of loginPayload) {
          const loginResponse = await request(app).post(`/api/v1/auth/login`).send(body);
          return expect(loginResponse.statusCode).toBe(StatusCodes.BAD_REQUEST)
        }

    })

    it("Login with missing password", async () => { // Unit test that tests the login with a missing password

       try {

        const loginPayload = [{
            email: "staffmember123@gmail.com",
        }]

        for(const loginBody of loginPayload) {
           const loginResponse = await request(app).post(`/api/v1/auth/login`).send(loginBody);
            expect(loginResponse.statusCode).toBe(StatusCodes.BAD_REQUEST);
        }

       } 
       
       catch(error) {

            if(error) {
              throw new Error(error);
            }
       }


    })

    it("Login with missing e-mail address", async () => {

        try {

            const loginPayload = [{
                password: "oiefjweiofj",
            }]

            for(const loginBody of loginPayload) {
                const loginResponse = await request(app).post(`/api/v1/auth/login`).send(loginBody);
                return expect(loginResponse.statusCode).toBe(StatusCodes.BAD_REQUEST)
            }
        } 
        
        catch(error) {
           if(error) {
             throw new Error(error);
           }
        }

    })
    
    it("Login with invalid (not found) e-mail address", async () => {

        try {

            const loginData = [{
                email: "notfoundemail@gmail.com",
                password: "notfdoundpassword"
            }]

            for (const loginBody of loginData) {

            }


        } 
        
        catch(error) {
           if(error) {
            throw new Error(error);
           }
        }


    })


})

describe("Forgot Password API - Unit Tests", () => {

    it("Forgot Password - Valid E-mail Address", async () => {

       const forgotPasswordPayload = [{email: "staffmember123@gmail.com"}]

       for(const body of forgotPasswordPayload) {
           const response = await request(app).post(`/api/v1/auth/forgot-password`).send(body);
           expect(response.statusCode).toBe(StatusCodes.OK)
       }


    })

    it("Forgot Password - Invalid (Not Found) E-mail Address", async () => {
        try {

        } 
        
        catch(error) {

        }

    })

    it("Forgot Password - Missing E-mail Address", async () => {
    
    })


})

describe("Update User Password API - Unit Test Suite", () => {

})

describe("Verify User E-mail Address Unit Test Suite", () => {

    it("Verify E-mail Address - Valid User ID and OTP", async () => {
       try {

       } 
       
       catch(error) {

       }
    })

    it("Verify E-mail Address - Invalid (Not FOund) user ID", async () => {
        try {

        }
        
        catch(error) {

        }
    })

    it("Verify User E-mail Address - Missing OTP", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

})

describe("Users Test Suite", () => {

    it("Fetch All Users Unit Test", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

    it("Fetch Single User By ID test ", async () => {

        try {
            const userResponse = await request(app).get(`/api/v1/auth/users/63e25f48d82eb035f7dc0653`)
            expect(userResponse.body.user.username).toBe("staffmember1234")
            expect(userResponse.statusCode).toBe(StatusCodes.OK);
        } 
        
        catch(error) {
            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }

    })

    it("Edit User Shifts - Valid Data", async () => {

        try {

            const userShiftData = {
                startShiftDate: "2015-03-25T12:00:00Z",
                endShiftDate: "2015-03-25T18:00:00Z"
            }

            const userResponse = await request(app).put(`/api/v1/auth/users/63e25f48d82eb035f7dc0653/update-shifts`).send(userShiftData);
            expect(userResponse.statusCode).toBe(StatusCodes.OK);
            expect(userResponse.body).toHaveProperty("success", true);
        } 
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }

        }

    })

    it("Edit User Shifts - Start Shift Date Invalid Format", async () => {

        try {

        } 
        
        catch(error) {

        }
    })

    it("Edit User Shifts - Missing End Shift Date", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

    it("Fetch Single Missing User ID", async () => {
        try {

        } 
        
        catch(error) {

        }
    })

    it("Delete All Users - Unit Test", async () => {

    })


})


// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose.connection.close();
    done()
});