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
exports.createUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const auth_1 = require("../models/auth");
const verificationEmail_1 = require("../utils/verificationEmail");
const appError_1 = __importDefault(require("../utils/appError"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, role } = req.body;
        const existingUser = yield user_1.UserModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return next(new appError_1.default('Email or phone number already in use', 409));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        const user = new user_1.UserModel({
            name,
            email,
            phone,
            is_email_verified: false,
            verification_token: verificationToken,
            is_phone_verified: false,
            is_need_to_change_password: false,
            is_active: true,
            role,
        });
        const createUserResult = yield user.save();
        const auth = new auth_1.AuthModel({
            password: hashedPassword,
            user_id: user._id,
        });
        const authResult = yield auth.save();
        console.log(createUserResult, authResult);
        yield (0, verificationEmail_1.sendVerificationEmail)(email, verificationToken);
        return res.status(201).json({ message: 'User created successfully', status: true });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
