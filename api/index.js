const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.use(cors());
app.use(express.json());

// Is the app running?

app.get('/', (req, res) => {
  res.status(200).send('API is running...')
})

// get all users

app.get('/users', (req, res) => {
  knex
    .select('*')
    .from('users')
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err))
})

// get all items

app.get('/items', (req, res) => {
  knex
    .select('*')
    .from('items')
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err))
})

// get items by user

app.get('/users/:uid', (req, res) => {
  knex
    .select('*')
    .from('items')
    .where('items.uid', '=', `${req.params.uid}`)
    .then((items) => {
      if (items[0]) {
        res.status(200).send(items)
      }
      else {
        res.status(404).send(`No items found that belong to ${req.params.uid}`)
      }
    })
    .catch((err) => {
      if (err) {
        res.status(404).send(err)
      }
    })
})

app.get('/items/:uid', (req, res) => {
  knex
    .select('*')
    .from('items')
    .where('items.uid', '=', `${req.params.uid}`)
    .then((items) => {
      if (items[0]) {
        res.status(200).send(items)
      }
      else {
        res.status(404).send(`No items found that belong to ${req.params.uid}`)
      }
    })
    .catch((err) => {
      if (err) {
        res.status(404).send(err)
      }
    })
})

// create a new user

app.post('/users', async (req, res) => {
  let newUser = req.body
  // checking db for a user with the same username, may be redundant with UI portion
  const existingUser = await knex.select('*').from('users').where('username', '=', newUser.username);
  console.log(existingUser)
  // checking if user input has all required fields (first and last name are not required)
  if (newUser && 
    Object.hasOwn(newUser, 'username') && 
    Object.hasOwn(newUser, 'hashed_password')) {
    // if username already taken
    if (existingUser[0]) {
      return res.status(409).send("User already exists");
    }
    // adding user to db
    knex('users')
      .insert(newUser, ['username', 'hashed_password'])
      .then((info) => res.status(200).send(info))
  } else {
    res.status(400).send('Missing required properties')
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});