const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');


const app = express();
app.use(express.static('public'));

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


app.get('/bus', (request, response) => {

    const connection = mysql.createConnection(mysqlConnection);
    const query = 'SELECT * FROM Bus';
    connection.connect((err) => {
        connection.query(query, (err, results) => {
            response.status(200).json(results);
        });
    });

});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});