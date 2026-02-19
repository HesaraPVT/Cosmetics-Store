import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req, res) {
    if (req.body.role == "admin") { // If the role specified in the request body is "admin", check if the user making the request is authorized to create admin users
        if (req.user != null) { // If user information is attached to the request object, check the user's role
            if (req.user.role == "admin") { // If the user's role is "admin", allow the creation of the new admin user
                res.status(403).json({message: "Unauthorized Access! You are not authorized to create admin users"}); // If the user's role is not "admin", respond with a 401 Unauthorized status and an error message
                return;
            }
        } else {
            res.status(403).json({message: "Unauthorized Access! You are not authorized to create admin users. Please login first"}); // If no user information is attached to the request object, respond with a 401 Unauthorized status and an error message
            return; // stops code execution and prevents the creation of the new admin user
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //hash the password using bcrypt

    const user = new User({ //create a new user document
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
    });

    user.save().then(() => {
        res.json({message: 'User created successfully'});
    }).catch((error) => {
        console.log('Error saving user', error);
        res.status(500).json({message: 'Error saving user'});
    });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).then((user) => {
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password); //compare the provided password with the hashed password in the database
            if (isPasswordCorrect) {
                const token = jwt.sign({email:user.email, firstName:user.firstName, lastName:user.lastName, role:user.role, Image:user.Image}, "2003Hesara");
                res.json({message: 'Login successful', token: token});
            } else {
                res.status(401).json({message: 'Invalid password'});
            }
        }
    })
}

export function isAdmin(req, res) { // Middleware function to check if the user has an admin role
    if (req.user == null) { 
        return false;
    }
    if (req.user.role != "admin") {
        return false;
    }
    return true;
}