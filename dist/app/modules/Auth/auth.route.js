"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// create an user('user' | 'admin')
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userValidations.userValidationSchema), auth_controller_1.AuthControllers.createUser);
// log in as user or admin
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userValidations.userLoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;
