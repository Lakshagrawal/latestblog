const jwt = require("jsonwebtoken")
const newUser = require('../models/newUser');

const verifying = async(req,res,next)=>{
    try{
        const token = await req.cookies.jwtoken;

        if(!token){
            return res.render("loginWarning")
        }

        const verifyUser = await jwt.verify(token,process.env.SECRET_KEY_TOKEN)
        const user = await newUser.findOne({_id: verifyUser._id});

        if(token === user.token){
            next();
        }
        else{
            res.status(404).json({message:"No entry to post your blog"});
        }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

module.exports = verifying;