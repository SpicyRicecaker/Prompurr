"use strict";
// Bring in express
const express = require('express');
const pathVars = require('common/dist/index');
// Initialize app with express, has a bunch of properties
const app = express();
// Look for environment variable in system before 3000
// basically need this for deployment (e.g. heroku)
const port = process.env.PORT || 3000;
// Literally THE WORST CODE that you'll ever see but it works for now
// .get is a route
app.use('/api/users', require('./routes/api/users'));
// Set static folder - OP
app.use(express.static(pathVars.front));
// port, callback
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
