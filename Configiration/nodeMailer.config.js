const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (fullName, email, userName) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${fullName}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:7500/confirm/${userName}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };
  module.exports.sendResetEmail = (fullName, email, userName) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "reset your password account",
      html: `<h1>reset password</h1>
          <h2>Hello ${fullName}</h2>
          <p> Please to reset you password click on the following link</p>
          <a href=http://localhost:7500/reset/${userName}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };