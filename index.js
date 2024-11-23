const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.json({
        info: 'Hello world!'
    });
});


const mysqlConnection = {
    host: 'localhost',        
    user: 'root',    
    password: 'Javeed1234',
    database: 'BestRoute', 
    port: 3306    
};


app.get('/bus', (req, res) => {
    const connection = mysql.createConnection(mysqlConnection);
    const query = 'SELECT * FROM Bus';  // Query to fetch all bus routes
    
    connection.connect((err) => {
        if (err) {
            res.status(500).json({ error: 'Database connection failed' });
        } else {
            connection.query(query, (err, results) => {
                if (err) {
                    res.status(500).json({ error: 'Query execution failed' });
                } else {
                    console.log(results);  // Log the data returned from the database
                    res.status(200).json(results);  // Send the results back
                }
                connection.end();
            });
        }
    });
});

app.get('/bus/search', (req, res) => {
    const { starting_point, destination } = req.query;
    
    // Validate query parameters
    if (!starting_point || !destination) {
        return res.status(400).json({ error: 'Starting Point and Destination are required' });
    }

    const connection = mysql.createConnection(mysqlConnection);
    const query = 'SELECT * FROM Bus WHERE starting_point = ? AND destination = ?';

    connection.connect((err) => {
        if (err) {
            res.status(500).json({ error: 'Database connection failed' });
        } else {
            connection.query(query, [starting_point, destination], (err, results) => {
                if (err) {
                    res.status(500).json({ error: 'Query execution failed' });
                } else {
                    res.status(200).json(results);
                }
                connection.end();
            });
        }
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});