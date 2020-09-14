import express from 'express';
import { Collection } from 'mongodb';

import * as prompurrDB from '../../db';

const userColl = (): Promise<Collection<any>> =>
  new Promise((resolve) => {
    resolve(prompurrDB.get().db('prompurrDB').collection('users'));
  });

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
  userColl()
    .then((data) => data.find({}))
    .then((data) => data.toArray())
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error sorry' });
    });
});

// Return a specific user with specific username
router.get('/:username', async (req, res) => {
  try {
    const collection = await userColl();
    const cursor = await collection.find({ username: req.params.username });
    if (await cursor.hasNext()) {
      return res.status(200).json(await cursor.next());
    }
    return res.status(404).json({ msg: "Couldn't find user!" });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Update a specific user with specific username
router.put('/:username', async (req, res) => {
  const query = { username: req.params.username };
  let queriedUser: any;
  try {
    const collection = await userColl();
    const cursor = await collection.find(query);
    if (await cursor.hasNext()) {
      queriedUser = await cursor.next();
    } else {
      return res.status(404).json({ msg: "Couldn't find user!" });
    }
    // Do some checking here
    const updateUser = {
      $set: {
        username: req.body.username ? req.body.username : queriedUser.username,
        id: req.body.id ? req.body.id : queriedUser.id,
        email: req.body.email ? req.body.email : queriedUser.email,
        tasks: req.body.tasks ? req.body.tasks : queriedUser.tasks,
      },
    };
    // Put updated values in
    await collection.updateOne(query, updateUser);
    return res.status(200).json({ msg: 'Successfully updated user' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Create a specifc user, later
// router.post();
router.post('/:username', async (req, res) => {
  try {
    const collection = await userColl();
    const cursor = await collection.find({ username: req.params.username });
    if (await cursor.hasNext()) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Do some checking here
    const newUser = {
      username: req.body.username,
      id: req.body.id,
      email: req.body.email,
      tasks: req.body.tasks,
    };
    if (newUser.username && newUser.email) {
      // Put updated values in
      await collection.insertOne(newUser);
      return res.status(200).json({ msg: 'Successfully created new user' });
    }
    return res.status(400).json({ msg: 'Please include a username and email' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

router.delete('/:username', async (req, res) => {
  try {
    const collection = await userColl();
    const deleteResult = await collection.deleteOne({
      username: req.params.username,
    });
    if (deleteResult.deletedCount === 0) {
      return res.status(400).json({ msg: 'User was not found' });
    }
    return res.status(200).json({ msg: 'Successuflly deleted user' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Return a specific user with specific id
// Implement this later if needed

export default router;
