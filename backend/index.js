import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js'; // Import the product router
import userRouter from './routers/userRouter.js'; // Import the user router
import orderRouter from './routers/orderRouter.js'; // Import the order router
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

const app = express();

app.use(cors()); // Enable CORS for all routes and you can input any specific origin in the cors() function if you want to restrict access to certain origins
app.use(bodyParser.json()); 

app.use((req, res, next) => { // Middleware to set CORS headers
    const tokenString = req.header("authorization");
    if (tokenString != null){
        const token = tokenString.replace("Bearer ", ""); // Remove the "Bearer " prefix from the token string
        console.log(token); // Log the token string to the console

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Verify the token using the secret key from .env
            if (decoded != null) {
                req.user = decoded; // Attach the decoded user information to the request object
                next(); // Call the next middleware function
            } else {
                console.log("Invalid token"); // If the token is invalid, log an error message
                res.status(403).json({message: "Invalid token"}); // Respond with a 403 Forbidden status and an error message
            }
        });
    } else {
        next(); // If no token is provided, call the next middleware function
    }
});
mongoose.connect(process.env.MONGODB_URL).then(() => { // process.env.MONGODB_URL is used to access the MongoDB connection string stored in the .env file, which allows for secure and flexible configuration of the database connection without hardcoding sensitive information in the codebase
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
}); 

app.use('/api/products', productRouter); // Use the product router for routes starting with /products

app.use('/api/users', userRouter); // Use the user router for routes starting with /users

app.use('/api/orders', orderRouter); // Use the order router for routes starting with /orders

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);