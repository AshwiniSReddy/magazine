

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// WebSocket server code
wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Example: Send a message to the client
    ws.send('fetching data');

    // Handle WebSocket messages
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
});

// Function to send subscription end updates
const sendSubscriptionEndUpdate = (user) => {
    wss.clients.forEach(client => {
        // Check if the client is still connected
        if (client.readyState === WebSocket.OPEN) {
            // Send the message to the client
            client.send(`Subscription ended for user ${user.email}`);
        }
    });
};

setTimeout(async () => {
    try {
        const usersToUpdate = await User.find({ magazineSubscription: true });
        for (const user of usersToUpdate) {
            await user.updateOne({ magazineSubscription: false });
            console.log(`Subscription ended for user ${user.email}.`);
            sendSubscriptionEndUpdate(user);
        }
    } catch (err) {
        console.error('Error setting subscription to false:', err);
    }
}, 60000); // 60000 milliseconds = 1 minute