const { WebSocketServer } = require('ws');
const { verifyToken } = require('../lib/jwt');

// userId -> Set<WebSocket>
const clients = new Map();

function setupWebSocket(server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    let userId = null;

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw);

        if (msg.type === 'auth') {
          const decoded = verifyToken(msg.token);
          userId = decoded.sub;

          if (!clients.has(userId)) {
            clients.set(userId, new Set());
          }
          clients.get(userId).add(ws);

          ws.send(JSON.stringify({ type: 'auth.ok' }));
          console.log(`[WS] Client authenticated: ${userId}`);
        }
      } catch {
        ws.send(JSON.stringify({ type: 'auth.error', message: 'Invalid token' }));
      }
    });

    ws.on('close', () => {
      if (userId && clients.has(userId)) {
        clients.get(userId).delete(ws);
        if (clients.get(userId).size === 0) {
          clients.delete(userId);
        }
      }
    });
  });

  console.log('[WS] WebSocket server attached on /ws');
}

function broadcast(userId, notification) {
  const sockets = clients.get(userId);
  if (!sockets) return;

  const message = JSON.stringify({
    type: 'notification.created',
    data: notification,
  });

  for (const ws of sockets) {
    if (ws.readyState === 1) {
      ws.send(message);
    }
  }
}

module.exports = { setupWebSocket, broadcast };
