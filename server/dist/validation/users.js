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
exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name cannot be empty',
        }),
        phone: joi_1.default.string().required().messages({
            'any.required': 'Phone number is required',
            'string.empty': 'Phone number cannot be empty',
        }),
        email: joi_1.default.string().email().required().messages({
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email cannot be empty',
        }),
        password: joi_1.default.string().required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty',
        }),
    });
    try {
        yield schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json({
            error_type: 'VALIDATION_ERROR',
            error_message: error.details.map((detail) => detail.message).join(', '),
        });
    }
});
exports.validateUserData = validateUserData;
