import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload) {
    console.log('Encrypting payload:', payload);
    
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('3d')
    .sign(encodedKey)
}

export async function createSession(payload) {
// This function sets the session cookie with the encrypted payload
  const session = await encrypt(payload);
  return session;
  res.setHeader('Set-Cookie', `session=${session}; Path=/; HttpOnly; SameSite=None; Secure;`);

//   const cookieStore = await cookies();
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     sameSite: 'none',
//     // maxAge: Number(process.env.SESSION_EXPIRY),
//     path: '/',
//   });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

  