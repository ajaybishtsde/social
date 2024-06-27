"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsync = void 0;
const createAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.createAsync = createAsync;
