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
exports.sendOTP = void 0;
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)(`AC${process.env.TWILIO_ACCOUNT_SID}`, process.env.TWILIO_AUTH_TOKEN || '');
const sendOTP = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.messages.create({
        body: `Your verification code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
    });
});
exports.sendOTP = sendOTP;
