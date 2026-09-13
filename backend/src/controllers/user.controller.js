import { User } from "../models/user.model.js";
import bcrypt , {hash} from "bcrypt";
import httpStatus from "http-status";
import crypto from "crypto";





const register = async(req,res)=>{
        const {name,username,password} = req.body;


        try {
            const existingUser = await User.findOne({username});

            if(existingUser){
                return res.status(httpStatus.FOUND).json({message:"User already exists"})
            }


            const hashPassword = await bcrypt.hash(password ,10);

            const newuser = new User(
                {
                    name : name,
                    username : username,
                    password : hashPassword,

                }
            );

             await newuser.save();
             res.status(httpStatus.CREATED).json({message:"User registered succesfully"})
        } catch (error) {
            res.json({message:`Something went wrong ${error}`})
        }
};



const login = async (req,res)=>{
    const {username ,password} = req.body;
    if(!username || !password){
       return  res.status(400).json({message:"please provide valid credentials"})
    }

    try {
        const user = await User.findOne({username})
        if(!user){
           return  res.status(httpStatus.NOT_FOUND).json({message:"User not found"})
        }

        if(bcrypt.compare(password , user.password)){
            let token  = crypto.randomBytes(20).toString("hex");
            user.token = token ; 
            await user.save();
            return res.status(httpStatus.OK).json({token: token});
        }
    } catch (error) {
        return res.status(500).json({message : `Something went wrong ${error}`})
    }
};


export {login ,register}