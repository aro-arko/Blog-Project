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
exports.AdminServices = void 0;
const AppErrror_1 = __importDefault(require("../../errors/AppErrror"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const user_model_1 = __importDefault(require("../User/user.model"));
const http_status_1 = __importDefault(require("http-status"));
const blockUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by ID
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        // If user does not exist, throw an error
        throw new AppErrror_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.isBlocked) {
        // If the user is already blocked, throw an error
        throw new AppErrror_1.default(http_status_1.default.BAD_REQUEST, 'User is already blocked');
    }
    // Update the user to block them
    const result = yield user_model_1.default.findByIdAndUpdate(id, {
        isBlocked: true,
    }, {
        new: true,
    });
    return result;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the blog exists
    const blog = yield blog_model_1.default.findById(id);
    if (!blog) {
        // If the blog does not exist, throw an error
        throw new AppErrror_1.default(http_status_1.default.NOT_FOUND, 'Blog not found!');
    }
    // Proceed to delete the blog
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.AdminServices = {
    blockUserIntoDB,
    deleteBlogFromDB,
};
