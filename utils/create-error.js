const createError =(code,message)=>{
    // console.log("CODE:" +code +" " +"MESSAGE: "+message);
    err = new Error(message);
    err.statusCode=code;
    return err;
}
module.exports =createError;