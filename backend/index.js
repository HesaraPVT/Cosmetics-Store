import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js'; // Import the product router
import userRouter from './routers/userRouter.js'; // Import the user router
import orderRouter from './routers/orderRouter.js'; // Import the order router
import jwt from 'jsonwebtoken';
<<<<<<< HEAD:backend/index.js
=======
import e from 'express';
import orderRouter from './routers/orderRouter.js'; // Import the order router
>>>>>>> aabace302b75706cef5f910c7da0666560155008:index.js

const app = express();

app.use(bodyParser.json()); 

app.use((req, res, next) => { // Middleware to set CORS headers
    const tokenString = req.header("authorization");
    if (tokenString != null){
        const token = tokenString.replace("Bearer ", ""); // Remove the "Bearer " prefix from the token string
        console.log(token); // Log the token string to the console

        jwt.verify(token, "2003Hesara", (err, decoded) => { // Verify the token using the secret key
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
mongoose.connect('mongodb+srv://admin:2003Hesara@cluster0.xmorvix.mongodb.net/?appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
}); 

app.use('/products', productRouter); // Use the product router for routes starting with /products

app.use('/users', userRouter); // Use the user router for routes starting with /users

app.use('/orders', orderRouter); // Use the order router for routes starting with /orders

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

// mongodb+srv://admin:123@cluster0.xmorvix.mongodb.net/?appName=Cluster0