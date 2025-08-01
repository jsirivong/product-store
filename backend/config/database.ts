import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely
export const sql = neon(
    // creates a SQL connection to our database using a connection string consisting of our environment variables
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`  
)

