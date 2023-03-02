require('dotenv.config');
import nodemailer from "nodemailer"

// Configure environment variables for the e-mail tansporter

export const createEmailTransporter = (): any => { // Create the e-mail transporter

return nodemailer.createTransport({

  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }


});


}