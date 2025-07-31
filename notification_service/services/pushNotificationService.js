import { Worker } from "bullmq";
import { redis as connection } from "../lib/redis.js";
import { queryDB } from "../lib/postgres.js";
import kafka from "../lib/kafka.js";

const producer = kafka.producer();
await producer.connect();

const worker = new Worker("notificationQueue", async (job) => {
    const { type } = job.data;
    console.log(`Processing job for ${type}`);
    try {
        if (type === "new_post") {
            const client = await queryDB("SELECT following_id as client_id, email, number FROM followers JOIN users ON following_id = user_id WHERE follower_id = $1", [job.data.user_id]);
            const sender = await queryDB("SELECT name FROM users WHERE user_id = $1", [job.data.user_id]);
            console.log(`Followers for user ${sender[0].name}:`, client);
            await producer.send({
                topic: 'post',
                messages: client.map(row => ({
                    value: JSON.stringify({ ...row, type: "post" }),
                    headers: {
                        'sender_name': sender[0].name,
                    },
                })),
            })
        }

        else if (type === "new_follower") {

            const res = await queryDB("SELECT user_id as client_id, email , number from users WHERE user_id = $1", [job.data.follower_id]);
            const client = res[0];
            const sender = await queryDB("SELECT name FROM users WHERE user_id = $1", [job.data.following_id]);
            await producer.send({
                topic: 'follow',
                messages: [
                    {
                        value: JSON.stringify({ ...client, type: "follow" }),
                        headers: {
                            'sender_name': sender[0].name,
                        },
                    },
                ],
            });
        }
        return { status: "success" };
    } catch (error) {
        console.error('Error processing job:', error);
        throw new Error("Processing failed");
    }
}, { connection });

worker.on('completed', job => {
    console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job.id} failed:`, err);
});

process.on('SIGINT', async () => {
    console.log('Disconnecting producer');
    await producer.disconnect();
    process.exit(0);
});
