// Import necessary Node.js modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Import path module for path operations
const WebSocket = require('ws');
const http = require('http');

const app = express();
const port = 3000;

// Define the full directory path where you want to store the user data
const dataDirPath = 'C:\\Users\\tony_\\Desktop\\CS 290 Web Dev\\Pizza Cult Web Page Assignment 6\\data';

// Define the full file path for user data within the specified directory
const userFilePath = path.join(dataDirPath, 'user_data.json');

// Make sure the data directory exists
if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath, { recursive: true }); // Create the directory if it does not exist
}

// Create an HTTP server from the Express application
const server = http.createServer(app);

// Create a WebSocket Server (WSS) instance
const wss = new WebSocket.Server({ server });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the current directory

// WebSockets logic: Handling connections and messages
wss.on('connection', (ws) => {
    console.log('A new client connected');
    
    // Broadcast a message to all connected clients
    ws.on('message', (message) => {
        console.log('Received:', message);
        
        // Broadcast the received message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Array to store pizza information
const pizzas = [
    {
        id: 1,
        name: 'The Divine Pepperoni',
        description: 'Classic pepperoni with a secret blend of cheeses.',
        details: 'Worshipful Ode: Behold "The Divine Pepperoni," not merely a pizza but a transcendent experience that elevates the soul. Each slice is a testament to the ancient rites of flavor, where the spicy embrace of premium pepperoni meets the secretive blend of sacred cheeses. This is no ordinary feast; it is an offering to the palate, a spicy, flavorful journey blessed by the highest echelons of culinary divinity.',
        image: 'https://i.ibb.co/j5XWw21/Divine-Pep.webp',
    },
    {
        id: 2,
        name: 'The Mystic Veggie',
        description: 'A heavenly assortment of fresh garden vegetables.',
        details: 'Sermon of the Soil: "The Mystic Veggie" stands as a verdant altar to the earth\'s bounty, a heavenly assortment that sings the praises of the garden\'s gifts. This pizza is a dream woven from the essence of purity, where each organic bell pepper, onion, and tomato is a hymn to the earth\'s splendor. To partake in this pizza is to commune with nature itself, to taste the essence of the garden divine, where every bite is a vow to the sacred harmony of flavors that nature intended.',
        image: 'https://i.ibb.co/fqRnqch/Mystic-Veggie.webp',
    },
    {
        id: 3,
        name: 'The Eternal Margherita',
        description: 'A divine interpretation of the classic, with freshly picked basil and heirloom tomatoes.',
        details: 'Divine Decree: "The Eternal Margherita" is not just a pizza; it is an everlasting bond with the timeless traditions of Napoli. This divine interpretation, with its freshly picked basil and heirloom tomatoes atop a sacred blend of mozzarella di bufala, is a homage to the eternal classic. Each slice is a prayer, a meditative experience that connects the soul to the simple yet profound pleasures of life. It is a testament to the art of pizza, eternal and unchanging, like the stars above.',
        image: 'https://i.ibb.co/WFPyW0m/Eternal-Margherita.webp',
    },
    {
        id: 4,
        name: 'The Cosmic Meat Lover\'s',
        description: 'An array of sacred meats from across the universe, united on a pizza.',
        details: 'Cosmic Invocation: "The Cosmic Meat Lover\'s" pizza is a cosmic voyage across the universe of flavors. An array of sacred meats, each slice is a celestial alignment of sausage, pepperoni, ham, and bacon, offering an unparalleled meaty experience. This pizza is for those who seek to explore the cosmic depths of flavor, where every bite is a journey through the starry expanse of culinary space, discovering the universal truth that binds all meat lovers together in cosmic harmony.',
        image: 'https://i.ibb.co/DrfvJ37/Cosmic-Meat-Lovers.webp',
    },
    {
        id: 5,
        name: 'The Transcendent Buffalo Chicken',
        description: 'Spicy buffalo chicken, drizzled with a celestial ranch dressing.',
        details: 'Spicy Salvation: "The Transcendent Buffalo Chicken" is a fiery baptism in the spicy sauce of the buffalo, anointed with a celestial ranch dressing. This pizza transcends the ordinary with its bold flavors, a testament to the brave souls who dare to explore the higher planes of taste. Each slice is a revelation, a spicy epiphany that enlightens the taste buds with the sacred fire of flavor, offering salvation through the divine interplay of heat and coolness, of spice and succor.',
        image: 'https://i.ibb.co/LpQYdsG/Trancendent-Buffalo-Chicken.webp',
    }
];

// POST route for "/join"
app.post('/join', (req, res) => {
    const { name, email } = req.body;
    
    // Read, update, and save user data
    fs.readFile(userFilePath, (err, data) => {
        let json = err ? [] : JSON.parse(data.toString()); // Parse existing data, or initialize an empty array
        json.push({ name, email });
        
        fs.writeFile(userFilePath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.sendStatus(500);
            }
            res.send(`Thank you for joining, ${name}! We will send a confirmation to ${email}.`);
        });
    });
});

// POST route for "/feedback"
app.post('/feedback', (req, res) => {
    // Assuming feedback contains name and message
    const feedback = req.body;
    console.log('Feedback received:', feedback);
    // Redirect to a thank you page after receiving feedback
    res.redirect('/za_thanks.html');
});

// GET route for the root
app.get('/', (req, res) => {
    // Serve the main HTML file
    res.sendFile(__dirname + '/za_cult.html');
});

// GET route to serve user data
app.get('/get-user-data', (req, res) => {
    // Serve the JSON file containing user data
    res.sendFile(__dirname + '/user_data.json');
});

// GET route to serve pizza data
app.get('/get-pizza-data', (req, res) => {
    // Send the pizzas array as JSON
    res.json(pizzas);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`); // Confirmation the server is running
});
