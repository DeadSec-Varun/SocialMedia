import { Kafka, logLevel } from 'kafkajs';
import axios from 'axios';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
    // logLevel: logLevel.NOTHING
});

const consumer = kafka.consumer({ groupId: 'event' });

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

                axios.post(`http://localhost:8002/notifications/send`, {    // Hit and forget api call
                    senderName,
                    client_id: data.client_id,
                    type: data.type
                }, {
                    validateStatus: () => true // Don't throw on any status
                });
            },
        });
    } catch (error) {
        console.error('Consumer error:', error);
    }
}

runConsumer();

