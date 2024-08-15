const { google } = require('googleapis');
const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN'
});

const express = require('express');
const app = express();

// กำหนดการตั้งค่า Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: 'YOUR_GOOGLE_API_KEY' });

app.post('/webhook', line.middleware({channelSecret: 'YOUR_CHANNEL_SECRET'}), async (req, res) => {
  const event = req.body.events[0];

  if (event.type === 'postback' && event.postback.data === 'calendar_menu_selected') {
    // ดึงข้อมูลกิจกรรมจาก Google Calendar
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const eventMessages = events.data.items.map((item) => {
      const start = item.start.dateTime || item.start.date;
      return {
        type: 'text',
        text: `Event: ${item.summary} \nStart at: ${start}`
      };
    });

    client.replyMessage(event.replyToken, eventMessages)
      .then(() => {
        res.status(200).send('Success');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error');
      });
  }
});

app.listen(3000);
