const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db/db.js');
const { path } = require('express/lib/application.js');

app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Välkommen till backend-server!');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/ind_project/index.html');
});

app.get('/head', (req, res) => {
  res.sendFile(__dirname + '/head.html');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password: ' + err.stack);
            res.status(500).send('Error registering user.');
            return;
        }

        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error registering user: ' + insertErr.stack);
                res.status(500).send('Error registering user.');
                return;
            }

            console.log('User registered with ID ' + insertResult.insertId);
            res.send('Your account has been registered!');
        });
    });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (dbErr, result) => {
    if (dbErr) {
      console.error('Fel vid inloggning: ' + dbErr.stack);
      res.status(500).send('Det uppstod ett fel vid inloggningen.');
      return;
    }

    if (result.length === 0) {
      res.status(401).send('Fel e-post eller lösenord.');
      return;
    }

    res.send('Inloggning lyckades!');
  });
});

app.listen(port, () => {
  console.log(`Servern lyssnar på port ${port}`);
});
