const express = require("express");
const db = require("../database/db");
const createError = require("../utils/create-error");

const router = express.Router();

//login
//data username password
//body
router.post("/login",async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const result = await db.query(`SELECT * FROM users WHERE username = ? AND password = ?`,[username,password]);
        // console.log(result);
        if(result[0].length === 0) {
            // return res.status(400).json({message:"Invalid user"});
            return next(createError(400,"Invalid user"));
        }
        res.status(200).json({message:"Login success"});
    }
    catch(err){
        console.log("INTERNAL SERVER ERROR");
        // res.status(500).json({message:"Internal server error"});
        createError(500,"Internal server error");
    }
});

/*
register
method post 
path /register
data username,password
body
*/
router.post("/register",async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const result =  await db.query(`SELECT * FROM users WHERE username = ?`,[username]);
          // console.log(result);
        
        //if have this user name result =  [ [ { id: 28, username: 'asdasdasdasd', password: '456654' } ], [`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, `username` VARCHAR(191) NOT NULL UNIQUE_KEY,`password` VARCHAR(191) NOT NULL]]
        if(result[0].length > 0)
        {
            console.log("user name is already in use");
            return res.status(400).json({message:"User name is already in use"});
        }
        await db.query(`INSERT INTO users (username,password) VALUES (?,?)`,[username,password]);
        res.status(201).json({message:"Success"});
        console.log("success");
    }
    catch(err){
        console.log("INTERNAL SERVER ERROR");
        res.status(500).json({message:err});
    }
   
   
});
//changePassword
//method :put |path:change-password
//data:username,newPasswoed
router.put("/change-password",async(req,res,next)=>{
    try{
        const {username,newPassword}=req.body;
    
        const result = await db.query(`SELECT * FROM users WHERE username = ?`,[username]);
        if(result[0].length<0){
            return res.status(400).json({messaga:"Invalid username"});
        }

        await db.query(`UPDATE users SET password = ? WHERE username = ?`,[newPassword,username]);
        res.status(200).json({message:"update password success"});
    }
    catch{
        console.log("INTERNAL SERVER ERROR");
        res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;