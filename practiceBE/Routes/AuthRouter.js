const { signupValidation, loginValidation, resetPassword } = require('../Middleware/AuthValidation');
const UserModel = require('../Models/user');
const bycrypt = require('bcrypt')
const router = require('express').Router();
const jwt = require('jsonwebtoken')

router.post('/login',loginValidation, async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const User = await UserModel.findOne({email})
        if(!User){
            return res.status(403).json({message:"User Not Exist SignUp again Please!", success:false})
        }

        const isPasswordEqual = await bycrypt.compare(password,User.password)
        if(!isPasswordEqual){
            return res.status(403).json({message:"Authentication Failed Password not match !", success:false})
        }

        const jwtToken = jwt.sign({email : User.email, _id:User._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200).json({
            message: "Login Successfully !",
            success:true,
            jwtToken,
            email,
            name:User.name
        })
    } catch (error) {
        res.status(500).json({message:"Internal Serval error!" , success:false})
    }
})

router.post('/signup', signupValidation ,async(req,res,next)=>{
    try {
        const {name,email,password} = req.body
        const User = await UserModel.findOne({email})
        if(User){
            res.status(409).json({message : 'User Is Already Exist! you can Login ! ' , success:false})
        }

        const result = new UserModel ({
            name,email,password
        })

        result.password = await bycrypt.hash(password,10);
        await result.save();
        res.status(201).json({message:"signup successful!" , success :true})
    } catch (error) {
        res.status(500).json({message:"Internal Serval error!" , success:false})
    }
})

router.post('/resetpass' ,resetPassword,async (req,res,next)=>{
    const {email , newPassword } = req.body;

    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(403).json({message:"User Not Exist SignUp again Please!", success:false})
    }
        const hashPass = await bycrypt.hash(newPassword,10);
        user.password = hashPass
        await user.save()
        res.status(200).json({message:"Password Reset successful!" , success :true})    
})
module.exports = router;