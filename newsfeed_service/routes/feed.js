import express from 'express';
import { queryDB } from '../lib/postgres.js';

const router = express.Router();


// GET recommened friends
router.get('/recomended/:user_id', async function (req, res) {
  const user_id = req.params.user_id;
  try {
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    // Logic to fetch recomendation for the user
    const recomendedData = await queryDB('SELECT u.user_id, u.name from users u LEFT JOIN followers f ON u.user_id = f.follower_id AND f.following_id = $1 where u.user_id != $1 AND f.follower_id IS NULL', [user_id]);
    console.log('Recomended Data:', recomendedData);
    res.json({ message: 'Recomended fetched successfully', recomendedData });

  } catch (error) {
    console.error('Error fetching recomendations:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET stories
router.get('/stories/:user_id', async function (req, res) {
  const user_id = req.params.user_id;
  try {
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    // Logic to fetch stories for the user
    const storyData = await queryDB('SELECT u.user_id, u.name FROM users u JOIN followers f ON f.follower_id = u.user_id WHERE following_id = $1', [user_id]);
    console.log('Story Data:', storyData);
    res.json({ message: 'Stories list fetched successfully', storyData });

  } catch (error) {
    console.error('Error fetching stories:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET feed listing
router.get('/:user_id', async function (req, res) {
  const user_id = req.params.user_id;
  try {
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const feedData = await queryDB('SELECT p.post_id, p.user_id, u.name, p.content, p.like, p.comment, p.share, p.created_on, f.is_liked, f.is_commented from feeds f JOIN posts p ON f.post_id = p.post_id JOIN users u ON p.user_id = u.user_id where f.user_id = $1 ORDER BY p.created_on DESC', [user_id]);
    console.log('Feed data:', feedData);
    res.json({ message: 'Feed fetched successfully', feedData });

  } catch (error) {
    console.error('Error fetching feed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
