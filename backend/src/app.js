import express, { urlencoded } from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";

import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./socketManager.js";
import userRoutes from "./routes/user.routes.js";


const app= express();
const server = createServer(app);
const io =  connectToSocket(server); 
app.set("port" , (process.env.PORT||8000));
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended : true}));

app.use("/api/v1/users", userRoutes)














app.get("/home" ,(req,res)=>{
    return res.json({"hello":"server"})
})

const start = async()=>{
    app.set("mongo_user")
    const connectionDb  = await mongoose.connect("mongodb://admin:ADMIN1234@ac-bo1fkf5-shard-00-00.7kefpdp.mongodb.net:27017,ac-bo1fkf5-shard-00-01.7kefpdp.mongodb.net:27017,ac-bo1fkf5-shard-00-02.7kefpdp.mongodb.net:27017/videocall?ssl=true&replicaSet=atlas-prflso-shard-0&authSource=admin&appName=videocall")
    console.log(`Mongo connected Db  Host : ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listening on port 8000")
    })
}
start();