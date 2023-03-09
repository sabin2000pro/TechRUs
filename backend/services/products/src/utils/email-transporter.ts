require('dotenv').config();
import nodemailer from 'nodemailer';

export const createEmailTransporter = async () => {

    return nodemailer.createTransport({
        
        host: process.env.SMTP_HOST,
        port: 2525,
      
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      
    })    

}