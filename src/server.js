'use strict';
require('dotenv').config();
const knex = require('knex');
const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');
const WebSocket = require('ws');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});
const server = app.listen(PORT);
const wss = new WebSocket.Server({ server });
app.set('db', db);
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});


