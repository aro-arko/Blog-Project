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
exports.BlogServices = void 0;
const AppErrror_1 = __importDefault(require("../../errors/AppErrror"));
const user_model_1 = __importDefault(require("../User/user.model"));
const blog_model_1 = __importDefault(require("./blog.model"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const createBlogIntoDB = (author, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: author === null || author === void 0 ? void 0 : author.userEmail });
    if (user) {
        payLoad.author = user._id;
    }
    else {
        throw new AppErrror_1.default(http_status_1.default.NOT_FOUND, 'User not found for the provided email');
    }
    const result = yield (yield blog_model_1.default.create(payLoad)).populate('author');
    return result;
});
const updateBlogIntoDB = (author, id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // finding the blog using it's _id
    const blogDetails = yield blog_model_1.default.findById(id);
    // blog author details
    const blogDetailsUserId = blogDetails === null || blogDetails === void 0 ? void 0 : blogDetails.author;
    const blogDetailsUserDetails = yield user_model_1.default.findById(blogDetailsUserId);
    const blogDetailsUserEmail = blogDetailsUserDetails === null || blogDetailsUserDetails === void 0 ? void 0 : blogDetailsUserDetails.email;
    // current user
    const accessingUser = author === null || author === void 0 ? void 0 : author.userEmail;
    // matching the user is same author or not
    if (blogDetailsUserEmail !== accessingUser) {
        throw new AppErrror_1.default(http_status_1.default.UNAUTHORIZED, 'You are not allowed to update this blog');
    }
    const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(id, payLoad, {
        new: true,
        upsert: true,
    }).populate('author');
    return updatedBlog;
});
const deleteBlogFromDB = (accessUserData, id) => __awaiter(void 0, void 0, void 0, function* () {
    // finding the blog using it's _id
    const blogDetails = yield blog_model_1.default.findById(id);
    // blog author details
    const blogDetailsUserId = blogDetails === null || blogDetails === void 0 ? void 0 : blogDetails.author;
    const blogDetailsUserDetails = yield user_model_1.default.findById(blogDetailsUserId);
    const blogDetailsUserEmail = blogDetailsUserDetails === null || blogDetailsUserDetails === void 0 ? void 0 : blogDetailsUserDetails.email;
    // current user
    const accessingUserEmail = accessUserData === null || accessUserData === void 0 ? void 0 : accessUserData.userEmail;
    if (blogDetailsUserEmail !== accessingUserEmail) {
        throw new AppErrror_1.default(http_status_1.default.UNAUTHORIZED, 'Sorry! You are not allowed to delete this blog');
    }
    const deletedBlog = yield blog_model_1.default.findByIdAndDelete(id);
    return deletedBlog;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogsQuery = new QueryBuilder_1.default(blog_model_1.default.find().populate('author'), query)
        .search(blog_constant_1.blogSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield blogsQuery.modelQuery;
    return result;
});
exports.default = getAllBlogsFromDB;
exports.BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogsFromDB,
};
