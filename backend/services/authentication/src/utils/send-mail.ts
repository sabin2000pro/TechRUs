
import nodemailer from "nodemailer"
require('dotenv').config()

// Configure environment variables for the e-mail tansporter

export const createEmailTransporter = (): any => { // Create the e-mail transporter

return nodemailer.createTransport({

  host: "smtp.mailtrap.io",
  port: 2525,

  auth: {
    user: "31c4555f29ccbb",
    pass: "66af38be36d489"
  }
});


}