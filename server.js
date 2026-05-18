const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2025";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(async entry => {
      const event = entry.messaging[0];
      const senderId = event.sender.id;
      const messageText = event.message?.text;
      if (messageText) {
        await sendReply(senderId, getReply(messageText));
      }
    });
  }
  res.sendStatus(200);
});

function getReply(text) {
  text = text.toLowerCase();
  if (text.includes('dam') || text.includes('price') || text.includes('daam')) {
    return 'Price List:\n\nAffordable Cards:\n50-100: 55 taka/pcs\n101-200: 45 taka/pcs\n\nPremium Cards:\n50-100: 65 taka/pcs\n101-200: 55 taka/pcs';
  } else if (text.includes('order') || text.includes('confirm')) {
    return 'Thank you! Our expert will contact you within 15-30 minutes.';
  } else if (text.includes('delivery')) {
    return 'Delivery:\nManikganj: 2-3 days\nDhaka: 3-5 days\nBangladesh: 5-7 days';
  } else {
    return 'Welcome to BOONDHON Printing House!\n\nType:\n"price" - for price list\n"delivery" - for delivery info\n"order" - to place order';
  }
}

async function sendReply(recipientId, message) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: message }
      })
    }
  );
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));