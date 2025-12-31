const express = require("express")

const router = express.Router()
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const User = require('../models/user')



router.post("/sign-up" , async(req , res)=>{
    try{
        const {username, password} = req.body
        // make sure the user does not exist
    const userInDatabase = await User.findOne({ username });

    if (userInDatabase) {
      return res.status(409).json({error:"Invalid username or password"})
    }

      // take the password and encrypt in some way.
    const hashPassword = bcrypt.hashSync(password, 10);
    req.body.password = hashPassword;

    const user = await User.create(req.body);

    const payload = {
    username:user.username,
    _id: user._id
}

const token = jwt.sign({ payload }, process.env.JWT_SECRET);

res.status(200).json({token})

    res.status(201).json({user})
    }
    catch(error){
        console.log(error)
    }
})


module.exports = router;