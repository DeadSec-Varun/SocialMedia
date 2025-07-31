import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'], // Updated for Docker network
    logLevel: logLevel.ERROR // Set log level to ERROR to reduce verbosity
});

export default kafka;