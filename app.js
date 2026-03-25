const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Product management system");
});

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'humlek_555'
})

connection.connect((err) => {
    if(err) {
        console.error('Error connecting to MYSQL:'. err);
        return;
    }
    console.log('Connected to MySQL successfully!');
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM product';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching items: ',err);
            return res.status(500).json({message: 'Error fetch item'});
        }
        res.json(results);
    });
});
app.post('/products', (req, res) => {
    const items = req.body;
    const query = `INSERT INTO product(ProductName, price, qty) VALUES('${items.ProductName}',${items.price}, ${items.qty})`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching items: ',err);
            return res.status(500).json({message: 'Error fetch item'});
        }
        res.status(201).json({id: results.insertld, ProductName: results.ProductName});  
    });
});
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const items = req.body;
    const query = `DELETE FROM product WHERE productID = ${id} `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error deleting item: ', err);
            return res.status(500).json({ message: 'Error deleting item' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
            res.json({ message: 'Item deleted' });
    });
});