import express from 'express';
var router = express.Router();

const clients = new Map();

router.get('/sse/:user_id', function (req, res) {
  const userId = req.params.user_id;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`: connected\n\n`);

  console.log(`New connection established for user ${userId}`);
  clients.set(userId, res);

  req.on('close', () => {
    console.log(`Connection closed for user ${userId}`);
    res.end();
    clients.delete(userId);
  });
});

router.post('/send', function (req, res) {

  const { senderName, client_id, type } = req.body;
  if (!senderName || !client_id || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  console.log(`Sending notification to user ${client_id} of type ${type} from ${senderName}`);
  console.log("Current connected clients:", [...clients.keys()].join(', '));
  const client = clients.get(String(client_id));
  if (!client) {
    console.log(`No client connected for user ${client_id}`);
    return res.status(400).json({ error: 'User not connected' });
  }
  const msg = type === 'post' ? `${senderName} posted something new !` : `${senderName} started following you !`;
  client.write(`event: message\n`);
  client.write(`data: ${JSON.stringify({ message: msg })}\n\n`);
  console.log(`Notification sent to user ${client_id}: ${msg}`);
  return res.status(200).json({ success: true });
});

export default router;
