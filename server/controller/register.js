const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require('../mydb/user');

module.exports.register = async (req, res) => {
    var mydata = req.body;
    if(!mydata)
    {
         res.status(400).json({ ok:"unsuccessfull registration",status:400});
    }
    else
    {
     res.status(200).json({ ok:"successfull registration",status:200});
    }
    mydata.password =await bcrypt.hash( mydata.password,10);
    UserModel.create(mydata)
    .then(()=>console.log("hi data is arrived"))
    .catch(()=>console.log("cut gaya"))
};

