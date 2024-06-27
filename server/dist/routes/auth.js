"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createAsync_1 = require("../utils/createAsync");
const auth_1 = require("../controllers/auth");
const authRoutes = (0, express_1.Router)();
authRoutes.get('/verify-email', (0, createAsync_1.createAsync)(auth_1.verifyEmail));
authRoutes.post('/request-otp', (0, createAsync_1.createAsync)(auth_1.requestOTP));
authRoutes.post('/verify-otp', (0, createAsync_1.createAsync)(auth_1.verifyOTP));
exports.default = authRoutes;