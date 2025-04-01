const  express=require("express");

const app=express(); 

app.use("/test",(req,res)=>{
    res.send("Hello from the sever");
});

app.use("/hello",(req,res)=>{
    res.send("Hello Hello");
});

app.listen(3000,()=>{
    console.log("Server is successfully on port on 3000...");
});

 


