const mongoose = require('mongoose');

const connectdb =   () => {
//mongoose.connect('mongodb+srv://22it113:WGnIPBMB4yU6CEXz@cluster0.3dm7l.mongodb.net/mydb')
mongoose.connect('mongodb://localhost:27017/mydb1')
.then(()=>{console.log("Database connected successfully!");})
.catch((err)=>{console.log("Database does not connected!");})
}
module.exports = connectdb;