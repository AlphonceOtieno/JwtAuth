const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (to, code) => {
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const subject = "Your OTP code";
  const text = `Your OTP code is ${code}. It expires in 10 minutes.`;
  const html = `<p>Your OTP code is <strong>${code}</strong>.</p><p>It expires in 10 minutes.</p>`;

  return transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

module.exports = {
  sendOtpEmail,
};
