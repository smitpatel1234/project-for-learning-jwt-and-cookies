const bcrypt = require("bcrypt");
const UserModel = require('../mydb/user');
const express = require('express');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const app = express();
app.use(cookieParser());


module.exports.login = async (req, res) => {

    const userdata1 = req.body;
    const userdata2 = await UserModel.findOne({email: userdata1.email});
    if(userdata2) {
        const isMatch = await bcrypt.compare(userdata1.password, userdata2.password);
        if(isMatch) {
            const token =await  userdata2.generateAuthToken();
            console.log(token);
             res.cookie("jwt", token, {
                expires: new Date(Date.now() + 3000000),
            });
           
            
            return res.json({message: "login successfully"});
           
        
        } else {
            return res.json({message: "password is incorrect"});
        }
    } else {
        return res.json({message: "email is incorrect"});
    }
};


