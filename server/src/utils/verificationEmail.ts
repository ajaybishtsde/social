import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ajay.bisht.inaraconsultancy@gmail.com', // Your email address
    pass: 'icuqfixroxnhmwgy', // Your email password
  },
});

export const sendVerificationEmail = async (userEmail: string, verificationToken: string): Promise<void> => {
  const verificationUrl = `http://localhost:${process.env.PORT || 3000}/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    html: `<h1>Email Verification</h1>
           <p>Please click the link below to verify your email address:</p>
           <a href="${verificationUrl}">Verify Email</a>`,
  };
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS, ' process.env.EMAIL_PASS');
  await transporter.sendMail(mailOptions);
};
