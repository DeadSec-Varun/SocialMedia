import { Worker } from "bullmq";
import {redis as connection} from "../lib/redis.js";
import { queryDB } from "../lib/postgres.js";

const worker = new Worker("pullQueue", async (job) => {
  const { follower_id, following_id } = job.data;
  console.log(`Processing job for user ${follower_id} with ${following_id}`);

  try {
    // Insert posts from followed user into follower's feed
    await queryDB('Insert into feeds (user_id, post_id) Select $1 , p.post_id from posts p where p.user_id = $2 ORDER BY p.created_on DESC LIMIT 3', [Number(following_id), follower_id]);
    return { status: "success"};
  } catch (error) {
    console.error(`Error processing post for user ${follower_id}:`, error);
    throw new Error("Processing failed");
  }
}, { connection });

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});
