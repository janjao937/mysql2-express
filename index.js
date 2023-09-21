const express = require("express");
const mysql2= require("mysql2/promise");

const app = express();


app.use(express.json());

const db = mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"mysql_todo_list",
    connectionLimit:11
});
//create todo
//post /create-todo
app.post("/create-todo",async(req,res,next)=>{
    try{
        const {title,userId,completed} = req.body;
        const result = await db.query(`SELECT * FROM users WHERE id = ?`,[userId]);
        if(result[0].length === 0){
            return res.status(400).json({message:"Invalid"});

        }
        await db.query(`INSERT INTO todos (title,completed,user_id) VALUES (? ,? ,? )`,[title,completed,userId]);
        res.status(200).json({message:"CREATE SUCCESS"});
    }
    catch{
        console.log("INTERNAL SERVER ERROR");
        res.status(500).json({message:"Internal server error"});
    }
})
/*
register
method post 
path /register
data username,password
body
*/
app.post("/register",async(req,res,next)=>{
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

//login
//data username password
//body
app.post("/login",async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const result = await db.query(`SELECT * FROM users WHERE username = ? AND password = ?`,[username,password]);
        // console.log(result);
        if(result[0].length === 0) {
            return res.status(400).json({message:"Invalid user"});
        }
        res.status(200).json({message:"Login success"});
    }
    catch(err){
        console.log("INTERNAL SERVER ERROR");
        res.status(500).json({message:"Internal server error"});
    }
});

//changePassword
//method :put |path:change-password
//data:username,newPasswoed
app.put("/change-password",async(req,res,next)=>{
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

//get todo
app.get("/get-todo",async(req,res,next)=>{
    try{
        const {searchTitle,userId} = req.query;//use query path
        if(searchTitle!== undefined && userId!== undefined){
            const result = await db.query(`SELECT * FROM todos WHERE title = ? AND user_id = ?`,[searchTitle,userId]);
            return res.status(200).json({ResultTodo:result[0]});
        }
        if(searchTitle !== undefined){
            const result = await db.query(`SELECT * FROM todos WHERE ?`,[searchTitle]);
            return res.status(200).json({ResultTodo:result[0]});
        }
        if(userId !== undefined){
            const result = await db.query(`SELECT * FROM users WHERE id = ?`,[userId]);
            return res.status(200).json({ResultTodo:result[0]});
        }
        const result = await db.query(`SELECT * FROM todos`);
        res.status(200).json({ResultTodo:result[0]});
   
    }
    catch(err){
        console.log("INTERNAL SERVER ERROR");
        res.status(500).json({message:"Internal server error"});

    }
});

//delete-todo 
//methods delete
//path: /delete-todo/:todoId
//data todoId
app.delete("/delete-todo/:todoId",async(req,res,next)=>{
    try{
        const {todoId} = req.params;//use param path
        const result = await db.query(`SELECT * FROM todos WHERE id = ?`,[todoId]);
        if(result[0].length === 0){
            return res.status(400).json({messaga:"todo id not found"});
        }

        await db.query(`DELETE FROM todos WHERE id = ?`,[todoId]);
        res.status(200).json({messaga:"DELETE SUCCESS"});
    
    }
    catch(error){
        console.log("INTERNAL SERVER ERROR");
        res.status(500).json({message:"Internal server error"});
    }
})


app.listen(8888,()=>console.log("hello i'am server"));