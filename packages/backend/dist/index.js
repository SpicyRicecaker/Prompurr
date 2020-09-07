"use strict";
// // const http = require('http');
Object.defineProperty(exports, "__esModule", { value: true });
// import { ServerResponse } from 'http';
// // const hostname = '127.0.0.1';
// // const port = 3000;
// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World');
// // });
// // server.listen(port, hostname, () => {
// //   console.log(`Server running at http://${hostname}:${port}/`);
// // });
const http = require('http');
const path = require('path');
const fs = require('fs');
// // First look for env variable, then look for 5000
const port = process.env.PORT || 3000;
// // An http server is based off of request and response
const server = http.createServer((req, res) => {
    // Build filePath
    const filePath = path.join(__dirname, '..', '..', 'frontend', 'dist', req.url === '/' ? 'index.html' : req.url);
    console.log(filePath);
    // Get extension of file
    const extname = path.extname(filePath);
    // Initial content type
    let contentType = 'text/html';
    // Check ext set content type
    switch (extname) {
        case '.js': {
            contentType = 'text/javascript';
            break;
        }
        case '.css': {
            contentType = 'text/css';
            break;
        }
        case '.json': {
            contentType = 'application/json';
            break;
        }
        default: {
            break;
        }
    }
    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page isn't found?
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err1, readContent) => {
                    if (err1) {
                        throw err;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(readContent, 'utf-8');
                });
            }
            else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error ${err.code}`);
            }
        }
        else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
    // switch (req.url) {
    // If root
    // case '/': {
    //   // Writehead is like setting the 'style' of a brush stroke (I think)
    //   fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
    //     if (err) {
    //       throw err;
    //     }
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.end(data);
    //   });
    // break;
    // }
    // IF >>>> WE'RE CALLING THE DATABASE <<<<
    // case '/api/users': {
    // const users = [
    //   { name: 'bob', age: 40 },
    //   { name: 'joe', age: 30 },
    // ];
    // res.writeHead(200, {'Content-Type' : 'application/json'})
    // res.end(JSON.stringify(users));
    // break;
    // }
    // default: {
    // res.end('invalid webpage?');
    // break;
    // }
    // }
});
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// console.log('hi');
