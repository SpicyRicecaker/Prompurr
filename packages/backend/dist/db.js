"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.connect = void 0;
// Needed
const mongodb_1 = require("mongodb");
// Error checking to make sure that the database is running
let client;
// Use connect moethod to connect to the server
// Done is a callback
exports.connect = (uri) => {
    return new Promise((resolve, reject) => {
        // If the database is already connected then we're done
        if (client) {
            console.log('Client already exists pogger');
            resolve();
        }
        // Otherwise, let's connect using the given url
        // We get err & db passed into the callback
        client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true });
        client.connect((err) => {
            // If there was an error connecting return it
            if (err) {
                reject(err);
            }
            // Otherwise, remember the database client connection
            resolve();
        });
    });
};
// How we'll be accessing the database from other files
exports.get = () => {
    return client;
};
// Close function that will likely not be used
// const close = (done: any) => {
//   // If we have a current connection
//   if (client.db) {
//     client.db.close((err: any) => {
//       client.db = null;
//       done(err);
//     });
//   }
// };
