const express = require("express");
const db = require("./database/db");
const createError = require("./utils/create-error");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/user-route");
const todoRoute = require("./routes/todo-routes");
const app = express();


app.use(express.json());
app.use("/user",userRoute);
app.use("/todo",todoRoute);
app.use(errorMiddleware);


app.listen(8888,()=>console.log("hello i'am server"));

//user
//register login changePassword
//register => /user/register
//login => /user/login
//changePassword => /user/change-password

//todo
//POST create todo => /todo
//GET get todo => /todo
//DELETE delete todo => /todo/:idToDelete
