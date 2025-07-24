import express from 'express';
var router = express.Router();
import {queryDB} from '../lib/postgres.js';

/* GET users listing. */
router.post('/', async function (req, res) {
  const { user_id, post_id, action } = req.body;
  if (!user_id || !post_id || !action)
    return res.status(400).json({ error: "Invalid request" });

  try {
    console.log(`User ${user_id} acted post: ${post_id} with ${action}`);
    await queryDB('Update feeds set $1 = $2 where user_id = $3 AND post_id = $4', [action.type, action.value, user_id, post_id]);
    res.status(200).json({ message: 'Action performed successfully' });
    // insert into notifications
    // queryDB('INSERT INTO notifications (user_id, post_id, action_type) VALUES ($1, $2, $3)', [user_id, post_id, action.type]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
