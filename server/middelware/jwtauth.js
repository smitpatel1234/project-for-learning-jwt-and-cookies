const jwt = require('jsonwebtoken');
const UserModel = require('../mydb/user');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

module.exports = async function jwtauth(req, res, next) {
    try {
        if (!req.cookies?.jwt) {
            console.log("JWT cookie is missing.");
            return res.status(401).json({ message: "Unauthorized" });
        }
        const verifyUser = jwt.verify(req.cookies.jwt, 'GFDETYUIOIUYTRTYUIOIUYTRTYUIOIUYTRTYUIOOIUYTYUIOP');
        const user = await UserModel.findOne({ _id: verifyUser._id, 'tokens.token': req.cookies.jwt });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT authentication error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
