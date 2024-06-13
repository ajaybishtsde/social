// @ts-ignore
import twilio from 'twilio';

const client = twilio(`AC${process.env.TWILIO_ACCOUNT_SID}`, process.env.TWILIO_AUTH_TOKEN || '');
export const sendOTP = async (to: string, otp: string): Promise<void> => {
  await client.messages.create({
    body: `Your verification code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
};
