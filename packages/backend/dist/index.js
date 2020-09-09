"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;
// Frontend path
const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
// Backend path
const backendPath = path.join(__dirname, '..', 'dist');
const server = http.createServer((req, res) => {
    const chunks = [];
    let bufferSize = 0;
    // First let's get the type of the request, GET or POST
    switch (req.method) {
        case 'GET': {
            // The main concern here is if we're trying to
            // serve static files or if we're interacting with the api
            let basePath = frontendPath;
            if (req.url.includes('data.json')) {
                basePath = backendPath;
            }
            // Get the path of the request. If we're requesting the root webpage (i.e. prompurr.org) then
            // return index.html, otherwise return whatever the request is
            const reqPath = path.join(basePath, req.url === '/' ? 'index.html' : req.url);
            // At this point we have to set the content type for this request
            // let's default to html, because that's our index.html
            // To get the content type we first have to know the extname
            const extName = path.extname(reqPath);
            let contentType = 'text/html';
            // Then return the right MIME type given the extname
            switch (extName) {
                // Javascript
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
            // We take this content type and serve out the content
            // to server the content we first have to read it
            fs.readFile(reqPath, (err, data) => {
                // There are a couple possible error codes I think
                if (err) {
                    switch (err.code) {
                        case 'ENOENT': {
                            // File not found
                            // In this case, we probably need to read
                            // our 404.html file and write that
                            fs.readFile(path.join(frontendPath, '404.html'), (err1, data1) => {
                                // 404 file not found
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(data1, 'utf-8');
                            });
                            break;
                        }
                        case 500: {
                            // Internal server error
                            res.writeHead(500, { 'Content-Type': 'text/html' });
                            res.end("<h1> We're sorry! <h1> <h2> Our server is having a big struggle <h2>", 'utf-8');
                            break;
                        }
                        default: {
                            // Some other error
                            res.end();
                            break;
                        }
                    }
                    // res.end();
                }
                else {
                    // Otherwise we can do some stuff
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data, 'utf-8');
                }
            });
            break;
        }
        case 'POST': {
            req.on('data', (chunk) => {
                chunks.push(chunk);
                // Really scuffed anti-flood
                bufferSize += chunk.length;
                if (bufferSize > 1000000) {
                    req.connection.destroy();
                }
            });
            req.on('end', () => {
                const data = Buffer.concat(chunks).toString();
                // Literally just write to file whatever
                switch (req.url) {
                    case '/data.json': {
                        // Write to file
                        fs.writeFile(path.join(backendPath, req.url), data, (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end();
                            }
                            res.writeHead(200);
                            res.end();
                        });
                        break;
                    }
                    default: {
                        res.writeHead(404);
                        res.end();
                        break;
                    }
                }
            });
            // write to file
            // fs.writeFile(reqPath,
            break;
        }
        default: {
            break;
        }
    }
});
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
