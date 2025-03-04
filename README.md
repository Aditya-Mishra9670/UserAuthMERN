# User Authentication in MERN with JWT

This repository contains a full-stack MERN (MongoDB, Express, React, Node.js) application for implementing user authentication using JSON Web Tokens (JWT). It includes essential features such as registration, login, password reset, and password update, designed to handle secure user authentication in modern web applications.

## Features

- **User Registration**: Allows new users to sign up by providing their email, password, and basic details. Passwords are securely hashed using bcrypt before storing them in the database.
- **User Login**: Authenticated users can log in with their email and password. A JWT is generated and sent back as a response, which is used to authorize subsequent requests.
- **Forgot Password**: Users can request a password reset link via email. The link expires after a certain time, and users can set a new password securely.
- **Update Password**: Logged-in users can update their password. The new password is hashed and updated in the database.
- **JWT Authentication**: The application uses JWT to manage session tokens and secure communication between the client and server. Tokens are stored in HTTP-only cookies to prevent cross-site scripting (XSS) attacks.
- **Password Hashing**: All passwords are hashed using bcrypt to ensure user data security.
- **Error Handling**: The app provides detailed error messages for failed authentication attempts, invalid input, or unauthorized actions.
- **Responsive UI**: A clean, user-friendly interface built with React ensures a seamless experience on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Email**: NodeMailer (for sending password reset links)

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (either locally or using MongoDB Atlas)
- A code editor (e.g., VSCode)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-jwt-authentication.git
   ```
   
2. Install dependencies for both frontend and backend:

   - Navigate to the `client` folder and install frontend dependencies:
     ```bash
     cd client
     npm install
     ```
   
   - Navigate to the `server` folder and install backend dependencies:
     ```bash
     cd server
     npm install
     ```

3. Configure environment variables:
   - In the `server` folder, create a `.env` file and add the following variables:
     ```env
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret_key
     SMTP_HOST=smtp.your_email_service.com
     SMTP_PORT=your_email_service_port
     SMTP_USER=your_email_address
     SMTP_PASS=your_email_password
     ```

4. Start the application:
   - In the `server` folder, start the backend server:
     ```bash
     npm start
     ```
   
   - In the `client` folder, start the React frontend:
     ```bash
     npm start
     ```

## Contributing

Feel free to fork this repository and submit pull requests if you'd like to contribute to its development. Ensure that your code adheres to the project's coding standards and includes tests for new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This project serves as a great starting point for adding user authentication to a MERN stack application with JWT, making it easier to handle secure login processes in modern web development.