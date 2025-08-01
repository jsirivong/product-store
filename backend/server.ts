import express from 'express';
import helmet from 'helmet'; // package you would like to have as best practice
import cors from 'cors';
import morgan from 'morgan'; // package you would like to have as best practice
import dotenv from 'dotenv';
import { router } from './routes/router.ts';
// const { Response, Request } = express;

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use([helmet(), morgan("dev"), cors()]); 
app.use(express.json());
// helmet is a security middleware that helps you protect your app by setting various HTTP headers
// morgan acts as a "logger" for requests, it logs the requests

app.get("/", (req, res)=>{
    console.log(res.getHeaders());
    res.status(200).send("Home Page");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on localhost:${PORT}\nServer is listening to port ${PORT}`);
}).on("error", (err)=>{
    console.log("Error: ", err);
})