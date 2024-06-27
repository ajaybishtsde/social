"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appError_1 = __importDefault(require("./utils/appError"));
const globalErrorHandler_1 = require("./utils/globalErrorHandler");
const connectDb_1 = __importDefault(require("./config/connectDb"));
const user_1 = __importDefault(require("./routes/user"));
const bodyParser = require("body-parser");
const auth_1 = __importDefault(require("./routes/auth"));
const corsOptions = {
    origin: '*',
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
const uri = process.env.MONGODB_URI || 'mongodb+srv://ajaybishtsde:ajaybishtsde@cluster0.561f4kq.mongodb.net/social';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
(0, connectDb_1.default)(uri)
    .then(() => {
    const port = process.env.PORT || 3001;
    app.get('/', (req, res) => {
        res.json({
            status: true,
            message: 'Server working properly',
        });
    });
    app.use('/user', user_1.default);
    app.use('/auth', auth_1.default);
    app.all('*', (req, res, next) => {
        next(new appError_1.default(`Requested URL ${req.originalUrl} is not found`, 404));
    });
    app.use(globalErrorHandler_1.globalErrorHandler);
    app.listen(port, () => {
        console.log(`App is listening at ${port}`);
    });
    process.on('unhandledRejection', err => {
        if (err instanceof Error) {
            console.log(err.name, err.message);
        }
    });
})
    .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
