import express from 'express';
import helmet from 'helmet'; // package you would like to have as best practice
import cors from 'cors';
import morgan from 'morgan'; // package you would like to have as best practice
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.ts';
import { sql } from './config/database.ts';
// const { Response, Request } = express;

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
// the dotenv.config() method loads environment variables from a .env file into process.env

app.use([helmet(), morgan("dev"), cors()]);
app.use(express.json());
// helmet is a security middleware that helps you protect your app by setting various HTTP headers
// morgan acts as a "logger" for requests, it logs the requests

app.use("/api/products", productRouter);

async function initDatabase() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP
            )
        `
        console.log("Database successfully initialized.");
    } catch (err) {
        console.log("Error initializing database: ", err);
    }
}

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}\nServer is listening to port ${PORT}`);
    }).on("error", (err) => {
        console.log("Error: ", err);
    })
})