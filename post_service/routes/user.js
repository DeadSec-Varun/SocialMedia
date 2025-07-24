import express from 'express';
const router = express.Router();
import { queryDB } from '../lib/postgres.js';
import { pullPostsToQueue, addNotificationToQueue } from '../lib/bullmq.js';

router.post('/follow', async function (req, res) {
  const { follower_id, following_id } = req.body;
  if (!follower_id || !following_id) {
    return res.status(400).json({ error: 'Invalid Request' });
  }
  try {
    console.log(`User ${following_id} requested user ${follower_id}`);
    await queryDB('INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)', [follower_id, following_id]);
    res.status(201).json({ message: 'Follow successful' });
    //TODO Push fan-out service for updating post in follower feed
    pullPostsToQueue({ follower_id, following_id });
    
    //Notification service to followed
    addNotificationToQueue({ following_id, follower_id, type: 'new_follower'});
  } catch (error) {
    console.error('Error in follow action:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
