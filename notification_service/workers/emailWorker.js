import kafka from '../lib/kafka.js';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const consumer = kafka.consumer({ groupId: 'email' });

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
                sendMail(data.email, data.type, senderName)
            },
        });
    } catch (error) {
        console.error('Consumer error:', error);
    }
}

runConsumer();

async function sendMail(to, type, senderName) {

    const subject = type === 'post' ? 'New posts' : 'New follower';
    const text = type === 'post' ? `${senderName} posted something new!`: `${senderName} started following you!`;
    const msg = {
        to,
        from: 'negivarun372@gmail.com',
        subject,
        text,
        html: `<strong>${text}</strong>`,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
}