"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pathVars = {
    front: path_1.default.join(__dirname, '..', '..', 'frontend', 'dist'),
    back: path_1.default.join(__dirname, '..', '..', 'backend', 'dist'),
};
module.exports = pathVars;
