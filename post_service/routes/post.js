import express from 'express';
var router = express.Router();
import {queryDB} from '../lib/postgres.js';
import {pushPostsToQueue, addNotificationToQueue} from '../lib/bullmq.js';

/* POST user content. */
router.post('/', async function (req, res) {
  const { content, user_id } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  try {
    console.log(`User ${user_id} posted content: ${content}`);
    const queryRes = await queryDB('INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING post_id', [user_id, content]);
    res.status(201).json({ message: 'Post created successfully' });
    console.log(`Post created successfully for user ${user_id}`);
    //TODO Push fan-out service for updating post in followers feed
    pushPostsToQueue({ user_id, post_id: queryRes[0].post_id });
    // Notification service to followers
    addNotificationToQueue({ user_id, type: 'new_post' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
