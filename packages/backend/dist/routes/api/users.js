"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users = require('../../../dist/data');
const router = express_1.default.Router();
// Gets all users
router.get('/', (req, res) => {
    res.json(users);
});
// Return a specific user with specific username
router.get('/:username', (req, res) => {
    res.json(users.filter((specificUser) => specificUser.username === req.params.username)[0]);
});
// Update a specific user with specific username
router.post('/:username', (req, res) => {
    const data = req.body;
    for (let i = 0; i < users.length; i += 1) {
        if (users[i].username === data.username) {
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
