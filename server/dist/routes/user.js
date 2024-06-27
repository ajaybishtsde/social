"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const createAsync_1 = require("../utils/createAsync");
const users_2 = require("../validation/users");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', users_2.validateUserData, (0, createAsync_1.createAsync)(users_1.createUser));
exports.default = userRoutes;
