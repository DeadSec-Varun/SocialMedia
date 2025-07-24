import { SignJWT, jwtVerify } from 'jose'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session'+ error)
    return null;
  }
}

export async function getSession(req) {
  const session = req.cookies['session'];
  
  if (!session) {
    console.log('No session cookie found');
    return null;
  }
  
  const payload = await decrypt(session);
  if (!payload) {
    return null;
  }
  console.log(`Session payload: ${JSON.stringify(payload)}`);
  
  
  return payload;
}

  