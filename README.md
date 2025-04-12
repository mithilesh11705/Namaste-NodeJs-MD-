<!-- # DevTinder - Developer Networking Platform

## Project Description

DevTinder is a networking platform for developers to connect with each other based on skills and interests. It provides features similar to dating apps but focused on professional connections between developers.

## Features

- User authentication (signup/login)
- User profile management
- Connection requests between users
- User feed/discovery
- Profile updates (skills, about, etc.)

## API Endpoints

### Authentication

- `POST /signup` - Register a new user
- `POST /login` - Authenticate existing user
- `GET /logout` - Log out current user

### User Management

- `GET /user` - Get user by email
- `GET /feed` - Get all users (discovery feed)
- `DELETE /delete` - Delete user account
- `PATCH /update/:userId` - Update user profile

### Profile

- `GET /profile` - Get current user profile
- `POST /profile` - Create/update profile

### Connections

- `POST /request` - Send connection request
- `GET /request` - Get connection requests
- `PATCH /request/:requestId` - Respond to request

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## Project Structure

```
src/
├── app.js                # Main application entry point
├── config/
│   └── database.js       # Database connection setup
├── middlewares/
│   └── auth.js           # Authentication middleware
├── models/
│   ├── connectionRequest.js  # Connection request model
│   └── user.js           # User model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── profile.js        # Profile routes
│   └── request.js        # Connection request routes
└── utils/
    └── validations.js    # Validation utilities
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create a `.env` file):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:

```bash
npm start
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- validator

## Development Dependencies

- nodemon (for development)

## License

[MIT](https://choosealicense.com/licenses/mit/) -->
