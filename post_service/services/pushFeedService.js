import { Worker } from "bullmq";
import {redis as connection} from "../lib/redis.js";
import { queryDB } from "../lib/postgres.js";

const worker = new Worker("pushQueue", async (job) => {
  const { user_id, post_id } = job.data;
  console.log(`Processing job for user ${user_id} with post ID ${post_id}`);

  try {
    await queryDB('INSERT INTO feeds (user_id, post_id) SELECT f.following_id, $2::int from followers f where f.follower_id = $1 UNION Select $1, $2::int', [user_id, Number(post_id)]);
    return { status: "success", post_id };
  } catch (error) {
    console.error(`Error processing post for user ${user_id}:`, error);
    throw new Error("Processing failed");
  }
}, { connection });

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});
