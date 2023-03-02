require('dotenv.config');
import nodemailer from "nodemailer"

// Configure environment variables for the e-mail tansporter

export const createEmailTransporter = (): any => { // Create the e-mail transporter

return nodemailer.createTransport({

  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: "4b0c595feba978",
    pass: "5d6876f0646672"
  }
  


});


}