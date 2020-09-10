"use strict";
const path = require('path');
const pathVars = {
    front: path.join(__dirname, '..', '..', 'frontend', 'dist'),
    back: path.join(__dirname, '..', '..', 'backend', 'dist'),
};
module.exports = pathVars;
