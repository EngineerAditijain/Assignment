const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// MySQL Connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mysql',
  });
  

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.post('/api/notes', (req, res) => {
  console.log("hi");
    const { title, description, date } = req.body;
    // let date = new date()
    const sql = 'INSERT INTO notes (title, description,  date) VALUES (?, ?, ?)';
    connection.query(sql, [title, description,  date], (err, result) => {
      if (err) {
        console.error('Error adding note:', err);
        res.status(500).json({ error: 'Error adding note' });
        return;
      }
      res.status(200).json({ message: 'Note added successfully', id: result.insertId });
    });
  });
  

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM notes WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting note:', err);
      res.status(500).json({ error: 'Error deleting note' });
      return;
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  });
});
app.get('/api/notes/getAll', (req, res) => {
  console.log("hi i am fetching");
    const sql = 'SELECT * FROM notes';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ error: 'Error fetching notes' });
        return;
      }
      console.log("results",results);
      res.status(200).json(results);
    });
  });
  

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
