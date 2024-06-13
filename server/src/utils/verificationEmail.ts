import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (userEmail: string, verificationToken: string): Promise<any> => {
  const verificationUrl = `http://localhost:${process.env.PORT || 3000}/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    html: `<h1>Email Verification</h1>
           <p>Please click the link below to verify your email address:</p>
           <a href="${verificationUrl}">Verify Email</a>`,
  };
  return await transporter.sendMail(mailOptions);
};
