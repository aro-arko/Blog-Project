"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
// create a blog (only users not admin)
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.blogValidationSchema), blog_controller_1.BlogController.createBlog);
// update a blog
router.patch('/:id', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.updateBlogValidationSchema), blog_controller_1.BlogController.updateBlog);
// delete a blog
router.delete('/:id', (0, auth_1.default)('user'), blog_controller_1.BlogController.deleteBlog);
// get all blogs
router.get('/', blog_controller_1.BlogController.getAllBlogs);
exports.BlogRoutes = router;
