const express = require("express");
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; // In-memory storage for users
let token = "simple-token";

// Register Route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
      return res.status(400).json({ msg: "User already exists" });
  }
  users.push({ username, password });
  return res.json({ msg: "User registered successfully" });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
      return res.json({ token, username });
  } else {
      return res.status(401).json({ msg: "Invalid credentials" });
  }
});

// App Data Route
app.get('/appData', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader === token) {
      return res.json({ msg: "This is the app data" });
  } else {
      return res.status(401).json({ msg: "Unauthorized" });
  }
});

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

const router = require('./routes/routes');
app.use('/', router);

app.listen(3001, () => {
  console.log("Server started on port 3001. Ctrl^c to quit.");
});
