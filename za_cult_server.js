const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000; // Define the port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the current directory

const filePath = './user_data.json'; // Path to the JSON file

// Handle POST requests to "/join"
app.post('/join', (req, res) => {
    const { name, email } = req.body; // Extract name and email from the request body
    const userData = { name, email }; // Prepare user data

    fs.readFile(filePath, (err, data) => {
        // Initialize json array or read existing data
        const json = err ? [] : JSON.parse(data);
        json.push(userData); // Add new user data to json array

        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.sendStatus(500); // Send a server error response
            }
            console.log('New user info has come in:', userData);
            res.send(`Thank you for joining, ${name}! We will send a confirmation to ${email}.`);
        });
    });
});

// Handle POST requests to "/feedback"
app.post('/feedback', (req, res) => {
    const feedback = req.body; // Assuming feedback contains name and message
    console.log('Feedback received:', feedback);

    // Optional: Save feedback to a file or process as needed
    // For simplicity, we're just logging it here

    // Redirect to the thank_you.html page after receiving feedback
    res.redirect('/za_thanks.html'); // Make sure its za_thanks.html file
});

// Serve "za_cult.html" for the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/za_cult.html');
});

// Serve the JSON data file when "/get-user-data" is requested
app.get('/get-user-data', (req, res) => {
    res.sendFile(__dirname + '/user_data.json');
});

// Start the server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
