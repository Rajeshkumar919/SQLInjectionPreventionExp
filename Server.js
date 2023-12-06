const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('your-database-file.db');

// Endpoint for handling login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Using a parameterized query to prevent SQL injection
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (row) {
      return res.status(200).json({ success: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

