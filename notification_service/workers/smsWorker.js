import kafka from '../lib/kafka.js';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const consumer = kafka.consumer({ groupId: 'sms' });

async function runConsumer() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'follow', fromBeginning: true });
        await consumer.subscribe({ topic: 'post', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message, topic }) => {
                const data = JSON.parse(message.value.toString());
                console.log(`Received message on topic ${topic}:`, data);
                const senderName = message.headers ? message.headers.sender_name?.toString() : 'Unknown';
                sendMessage(data.number, data.type, senderName);
            },
        });
    } catch (error) {
        console.error('Consumer error:', error);
    }
}

runConsumer();

async function sendMessage(reciever, type, senderName) {
    if (!reciever) {
        console.log('Number required for message');
        return;
    }
    const body = type === 'post' ? `${senderName} posted something new!`: `${senderName} started following you!`;
    try {
        const msg = await client.messages
            .create({
                // from: 'whatsapp:+14155238886', // Twilio sandbox number
                from: '+15412497864',
                to: `+91${reciever}`,   // Your verified number
                body
            });
        console.log('Message sent:', msg.sid);
    }
    catch (error) {
        console.error('Error sending Message:', error);
    }
}
