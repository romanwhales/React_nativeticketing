const express = require("express");
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");



const router = express.Router();

router.post('/signin',async (req,res) => {
    const {email,password} = req.body;
    console.log("Here 2")
    if(!email || !password){
        return res.status(422).send({
            error: 'Must Provide email and Password'
        })
    }

    const user = await User.findOne({email})
    console.log("User is ",user);
    if(!user){
        return res.status(422).send({error:'Invalid password or email'})
    }else{
        try{
            await user.comparePassword(password);
            console.log(user.comparePassword(password));
            const token = jwt.sign({userId: user._id},'MY_SECRET_KEY');
            res.send({
                token
            })
        }catch(err){
            res.status(422).send({
                error: 'Invalid password or email'
            })
        }
    }
    
    
})

router.post('/signup',async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = new User({email,password});
        await user.save();
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY');

        res.send({token});
    }catch(e){
        return res.status(422).send(e.message);
    }
   
})


module.exports = router;