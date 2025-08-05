import express, { type Request, type Response, type NextFunction } from 'express';
import helmet from 'helmet'; // package you would like to have as best practice
import cors from 'cors';
import morgan from 'morgan'; // package you would like to have as best practice
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.ts';
import { sql } from './services/database.ts';
import { aj } from './lib/arcjet.ts';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
// the dotenv.config() method loads environment variables from a .env file into process.env

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// helmet is a security middleware that helps you protect your app by setting various HTTP headers
// morgan acts as a "logger" for requests, it logs the requests

// apply arcjet to all routes
app.use(async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const decision = await aj.protect(req, {
            requested: 1 // specifies that each request consumes 1 token
        })

        if (decision.isDenied()){
            if (decision.reason.isRateLimit()){
                // status code 429 means "too many requests"
                res.status(429).json({
                    error: "Too many requests within a specific timeframe."
                })
            } else if (decision.reason.isBot()){
                // status code 403 means "you don't have permission or authorization to access the requested resource"
                res.status(403).json({
                    error: "No bots allowed"
                })
            } else {
                res.status(403).json({
                    error: "Forbidden"
                })
            }
            return
        }

        // check for spoofed (act human) bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({error: "Spoofed bot detected"});
        }

        next();
    } catch (err){
        console.log("Arcjet error", err);
        next(err);
    }
})

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