# Blog Project API

## Overview

The Blog Project API is a system development project created for a blogging platform where users can write, update, and delete blogs. It has two different roles, Admin and User. The system also comes with secure authentication, role-based access control, and a public API for blog viewing that comes with advanced features such as search, sort, and filters.

## Features

## User Roles

### Admin

- Can delete any blog.
- Can block any user by updating a property isBlocked.
- Cannot update any blog.

### User

- Can create a new blog.
- Can delete their own blogs.
- Can update thier own blogs.

## Authentication & Authorization

- Authentication: Users must log in to perform write, update, and delete operations.
- Authorization: Admin and User roles are differentiated and secured.

## Blog API

- A public API to read blogs.
- Includes blog title, content, author details, and other necessary information.

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (locally or use MongoDB Atlas)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/aro-arko/Blog-Project.git
   ```
2. Install Dependencies:
   ```bash
   cd blog-project
   npm install
   ```
3. Set up environment variables:
   Create a .env file in the root of the project and configure it as needed (e.g., MongoDB connection URL).
4. Start the application:

   ```bash
   npm run dev
   ```

   This will start the server at `http://localhost:5000/`

   If you want to use our online live server, here is the link: `https://blog-project-server-snowy.vercel.app/`

## Models

### User Model

```
{
  name: string; // Full name of the user
  email: string; // Email address used for authentication and communication
  password: string; // Securely stored password
  role: "admin" | "user"; // Access level, default is "user"
  isBlocked: boolean; // Flag indicating whether the user is blocked, default is false
  createdAt: Date; // Timestamp when the user was created
  updatedAt: Date; // Timestamp of the last update
}
```

## Models

### Blog Model

```
{
  title: string; // Title of the blog post
  content: string; // Main body of the blog post
  author: ObjectId; // Reference to the User model
  isPublished: boolean; // Indicates if the blog is published, default is true
  createdAt: Date; // Timestamp when the blog post was created
  updatedAt: Date; // Timestamp of the last update
}
```

## API Endpoints

### 1. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

Registers a new user.

**Request Body:**

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

- **Success (201):**

```
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

- **Failure (400):**

```
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

#### 1.2 Login User

**POST** `/api/auth/register`

Authenticates a user and generates a JWT token.

**Request Body:**

```
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

- **Success (201):**

```
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

- **Failure (401):**

```
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

### 2. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

Allows a logged-in user to create a blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Request Body:**

```
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

- **Success (201):**

```
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

Allows a logged-in user to update their own blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Request Body:**

```
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

- **Success (200):**

```
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

Allows a logged-in user to delete their own blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Response:**

- **Success (200):**

```
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

Provides a public API to fetch all blogs with options for search, sort, and filter.

**Query Parameters:**

- search: Search blogs by title or content (e.g., search=blogtitle).
- sortBy: Sort blogs by fields like createdAt or title (e.g., sortBy=title).
- sortOrder: Sorting order, asc or desc (e.g., sortOrder=desc).
- filter: Filter blogs by author ID (e.g., filter=authorId).

**Response:**

- **Success (200):**

```
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

### 3. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

Allows an admin to block a user.

**Request Header:**

```
Authorization: Bearer <token>
```

**Response:**

- **Success (200):**

```
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

#### 3.2 Delete Blog

**PATCH** `/api/admin/users/:userId/block`

Allows an admin to delete any blog.

**Request Header:**

```
Authorization: Bearer <token>
```

**Response:**

- **Success (200):**

```
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

## Error Handling

A consistent error response format is implemented:

```
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "error stack trace"
}
```

## Acknowledgments

- Special thanks to MongoDB and Mongoose for their robust database solutions.
- Thanks to Express.js for simplifying the development of the REST API.
