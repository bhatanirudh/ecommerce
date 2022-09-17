const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");
let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
        auth: { 
            user: process.env.user,
            pass: process.env.pass
        }
 });

  module.exports = {
    transporter: transporter,
}