import express from 'express';

const users = require('../../../dist/data');

export interface task {
  description: string;
  dateCreated: Date;
  dateDue: Date;
}

export interface user {
  username: string;
  password: string;
  id: number;
  tasks: Array<task>;
}

const router = express.Router();

// Gets all users
router.get('/', (req, res) => {
  res.json(users);
});

// Return a specific user with specific username
router.get('/:username', (req, res) => {
  res.json(
    users.filter(
      (specificUser: user) => specificUser.username === req.params.username,
    )[0],
  );
});

// Update a specific user with specific username
router.post('/:username', (req, res) => {
  const data = req.body;
  for(let i = 0; i < users.length; i+=1){
    if(users[i].username === data.username){
      users[i] = data;
      break;
    }
  }
  res.end();
});

// Create a specifc user, later
// router.post();

// Return a specific user with specific id
// Implement this later if needed

module.exports = router;
