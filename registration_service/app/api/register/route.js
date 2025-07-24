import * as client from '@/lib/postgres';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';

export async function POST(req) {
    try {
        await client.connectDB();
        let { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ error: 'Name, email and password are required' }), { status: 400 });
        }
        // Normalize email to lowercase
        email = email.toLowerCase();

        const res = await client.queryDB('SELECT 1 FROM users WHERE email = $1 LIMIT 1',
            [email]);
        if (res.length > 0) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
        }
        // Hash the password before saving
        password = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await client.queryDB(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING userId',
            [name, email, password]
        );
        console.log('User ID:', newUser[0].user_id);
        
        // await createSession({ id: newUser[0].user_id.toString() });
        return new Response(JSON.stringify({user_id: newUser[0].user_id, message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
    finally {
        await client.disconnectDB();
    }
}

