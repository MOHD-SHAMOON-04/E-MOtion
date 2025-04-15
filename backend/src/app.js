import express from "express";
import dotenv from "dotenv";
import driverRoute from "./routes/driver.route.js"
dotenv.config();
let PORT = process.env.PORT;

const app = express();


app.use("/driver",driverRoute);


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})

