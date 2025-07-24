import 'dotenv/config'; // This loads .env into process.env
import { Client } from "pg";

let client;

export async function connectDB() {
    if (!client) {
        try {
            client  = new Client();
            await client.connect();
            console.log("PostgreSQL connected successfully");
        } catch (error) {
            console.error("Failed to connect to PostgreSQL:", error);
            throw error;
        }
    }
    else
        console.log("PostgreSQL is already connected");
}

export async function disconnectDB() {
    if (client) {
        try {
            await client.end();
            client = null;
            console.log("PostgreSQL disconnected successfully");
        } catch (error) {
            console.error("Failed to disconnect from PostgreSQL:", error);
            throw error;
        }
    }
}
export async function queryDB(query, params = []) {
    try {
        const res = await client.query(query, params);
        return res.rows;
    }
    catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}