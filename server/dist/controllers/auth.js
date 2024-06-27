"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.requestOTP = exports.verifyEmail = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const user_1 = require("../models/user");
const twilioService_1 = require("../utils/twilioService");
const appError_1 = __importDefault(require("../utils/appError"));
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const user = yield user_1.UserModel.findOne({ verification_token: token });
    if (!user) {
        return next(new appError_1.default('Invalid or expired token', 400));
    }
    user.is_email_verified = true;
    user.verification_token = null;
    yield user.save();
    return res.status(200).json({ message: 'Email verified successfully' });
});
exports.verifyEmail = verifyEmail;
const OTP_EXPIRATION_TIME = 5 * 60 * 1000;
const requestOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    const otp = otp_generator_1.default.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    const user = yield user_1.UserModel.findOneAndUpdate({ phone }, { otp, otp_expiration: Date.now() + OTP_EXPIRATION_TIME }, { new: true, upsert: true });
    console.log(user);
    const result = yield (0, twilioService_1.sendOTP)(phone, otp);
    return res.status(200).json({ message: 'OTP sent successfully' });
});
exports.requestOTP = requestOTP;
const verifyOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, otp } = req.body;
    const user = yield user_1.UserModel.findOne({ phone });
    if (!user) {
        return next(new appError_1.default('User not found', 400));
    }
    if (user.otp !== otp) {
        return next(new appError_1.default('Invalid OTP', 400));
    }
    if (user.otp_expiration && Date.now() > user.otp_expiration) {
        return next(new appError_1.default('OTP expired', 400));
    }
    user.is_phone_verified = true;
    user.otp = null;
    user.otp_expiration = null;
    yield user.save();
    return res.status(200).json({ message: 'Phone number verified successfully' });
});
exports.verifyOTP = verifyOTP;
