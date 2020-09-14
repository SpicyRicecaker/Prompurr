"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Bring in express
const express_1 = __importDefault(require("express"));
// Assert basically test a statement if true or false,
// if false throws error and quits program
const index_1 = __importDefault(require("@prompurr/common/dist/index"));
const db = __importStar(require("./db"));
const users_1 = __importDefault(require("./routes/api/users"));
const uri = 'mongodb+srv://spicyricecaker:manguwu~@cluster0.lvrd8.mongodb.net/prompurrDB?retryWrites=true&w=majority';
// Initialize app with express, has a bunch of properties
const app = express_1.default();
// Look for environment variable in system before 3000
// basically need this for deployment (e.g. heroku)
const port = process.env.PORT || 3000;
db.connect(uri)
    .then(() => {
    console.log(`Successfully connected to ${uri}`);
    // port, callback
    // Literally THE WORST CODE that you'll ever see but it works for now
    // .get is a route
    // Body parse middleware, allow us to take in post/get request
    app.use(express_1.default.json());
    app.use('/api/users', users_1.default);
    // Set static folder - OP
    app.use(express_1.default.static(index_1.default.front));
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
    .catch((err) => console.log(err));
