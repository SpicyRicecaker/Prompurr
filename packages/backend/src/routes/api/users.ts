import express from 'express';

export interface task {
  description: string;
  dateCreated: Date;
  dateDue: Date;
}

export interface user {
  username: string;
  id: number;
  email: string;
  tasks: Array<task>;
}

const router = express.Router();

// Gets all users
router.get('/', (req, res) => {
  res.json(members);
});

// Return a specific user with specific username
router.get('/:username', (req, res) => {
  const resMsg = { code: 404, msg: 'User not found.' };
  for (let i = 0; i < members.length; i += 1) {
    if (members[i].username === req.params.username) {
      res.status(200).json(members[i]);
    }
  }
  res.status(404).json(resMsg);
});

// Update a specific user with specific username
router.put('/:username', (req, res) => {
  // Updates a old user with new user details
  // Data(newUser), oldUserIndex
  const updateMember = (newUser: user, i: number) => {
    // First we have to check if the values exist tho
    members[i].username = newUser.username
      ? newUser.username
      : members[i].username;
    members[i].id = newUser.id ? newUser.id : members[i].id;
    members[i].email = newUser.email ? newUser.email : members[i].email;
    members[i].tasks = newUser.tasks ? newUser.tasks : members[i].tasks;
  };
  const data = req.body;
  const resMsg = { code: 404, msg: 'User not found.' };
  // To find a user, loop through userlist
  for (let i = 0; i < members.length; i += 1) {
    // If the user matches
    if (members[i].id === parseInt(data.id, 10)) {
      // Update the member to match
      updateMember(data, i);
      // Then update our end code (maybe message too?)
      resMsg.code = 200;
      resMsg.msg = 'User updated successfully';
    }
  }
  res.status(resMsg.code).json(resMsg);
});

// Create a specifc user, later
// router.post();
router.post('/:username', (req, res) => {
  const data = req.body;
  const newUser = {
    username: data.username,
    id: data.id,
    email: data.email,
    tasks: data.tasks,
  };
  if (!newUser.username && !newUser.email) {
    return res.status(400).json({ msg: 'No username and email' });
  }
  return res.status(200).send();
});

// Return a specific user with specific id
// Implement this later if needed

module.exports = router;
