require('dotenv').config()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");


const User = new mongoose.Schema({
    date:{type:Date, format: "%Y-%m-%d", required:true},
    admin:{type:Number,required:true},
    user:{type:String,required:true},
    pass:{type:String,required:true},
    email:{type:String,required:true},
    name:{type:String,require:true},
    token:{type:String}
})


// generate token and storing in the DB 
// It is also use as the middleware where I send the token to the 
User.methods.generateAuthToken = async function(req,res){
    // console.log("this is the _id "+this._id);
    try {
        // this ==> User   value
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY_TOKEN);
        // console.log(token);
        this.token = token
        await this.save();
        return token;
    } catch (error) {
        console.log("the error part" + error);
    }
}


module.exports = new mongoose.model('user',User);