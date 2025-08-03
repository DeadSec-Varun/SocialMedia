import 'dotenv/config'; // This loads .env into process.env
import { Pool } from "pg";

let pool;

export async function connectDB() {
    if (!pool) {
        try {
            pool  = new Pool();
            const client = await pool.connect();
            console.log("PostgreSQL pool connected successfully");
            client.release(); // Release the client back to the pool
             // Listen for errors so app doesn’t crash
            pool.on('error', (err) => {
                console.error('Unexpected PG pool error', err);
            });
        } catch (error) {
            console.error("Failed to connect to PostgreSQL:", error);
            throw error;
        }
    }
    else
        console.log("PostgreSQL is already connected");
}

export async function disconnectDB() {
    if (pool) {
        try {
            await pool.end();
            pool = null;
            console.log("PostgreSQL pool disconnected successfully");
        } catch (error) {
            console.error("Failed to disconnect from PostgreSQL:", error);
            throw error;
        }
    }
}
export async function queryDB(query, params = []) {
    if(!pool)
        await connectDB();
    try {
        const res = await pool.query(query, params);
        return res.rows;
    }
    catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}