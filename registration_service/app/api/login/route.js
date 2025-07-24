import * as client from '@/lib/postgres';
import { createSession } from '@/lib/session';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await client.connectDB();
        let { email, password } = await req.json();
        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email or password missing' }), { status: 400 });
        }

        // Normalize handle to lowercase
        email = email.toLowerCase();

        const res = await client.queryDB('SELECT user_id,password FROM users WHERE email = $1 LIMIT 1', [email]);
        console.log(res);

        if (res.length === 0 || !(await bcrypt.compare(password, res[0].password))) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }
        
        // await createSession({ id: res[0].user_id.toString() });
        return new Response(JSON.stringify({user_id: res[0].user_id , message: 'User logged in successfully' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
    finally {
        await client.disconnectDB();
    }
}