const express = require("express");
const db = require("../database/db");
const createError = require("../utils/create-error");

const router = express.Router();
//create todo
//post /create-todo
router.post("/create-todo",async(req,res,next)=>{
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


//get todo
router.get("/get-todo",async(req,res,next)=>{
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
router.delete("/:todoId",async(req,res,next)=>{
    try{
        const {todoId} = req.params;//use param path
        const result = await db.query(`SELECT * FROM todos WHERE id = ?`,[todoId]);
        if(result[0].length === 0){
            // return res.status(400).json({messaga:"todo id not found"});
            // return next({messaga:"todo id not found",statusCode:400});
            return next(createError(400,"todo id not found"));
        }

        await db.query(`DELETE FROM todos WHERE id = ?`,[todoId]);
        res.status(200).json({messaga:"DELETE SUCCESS"});
    
    }
    catch(error){
        // console.log("INTERNAL SERVER ERROR");
        // res.status(500).json({message:"Internal server error"});
        next(new Error("Internal server error"));
    }
})

module.exports = router;