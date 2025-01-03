const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }]
});
UserSchema.methods.generateAuthToken = async function () {
    try {
        const user = this;
        const jwtSecret = process.env.JWT_SECRET;
        console.log(jwtSecret);
        const token = jwt.sign({_id: user._id},'GFDETYUIOIUYTRTYUIOIUYTRTYUIOIUYTRTYUIOOIUYTYUIOP');
        user.tokens = user.tokens.concat({token : token});
        await user.save();
        return token;
    } catch (error) {
         console.log("the error part of generateAuthToken",error);
    }
  
}

const mymodel = mongoose.model('Users1',UserSchema);

module.exports = mymodel;
