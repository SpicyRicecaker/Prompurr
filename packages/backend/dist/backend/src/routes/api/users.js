"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const users = require('../../../dist/data');
const router = express.Router();
// Gets all users
router.get('/', (req, res) => {
    res.json(users);
});
// Return a specific user with specific username
router.get('/:username', (req, res) => {
    res.json(users.filter((some) => some.username === req.params.username));
});
// Update a specific user with specific username
router.put('/:username', (req, res) => {
    res.end();
});
// Create a specifc user, later
// router.post();
// Return a specific user with specific id
// Implement this later if needed
module.exports = router;
