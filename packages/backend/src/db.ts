// Needed
import { MongoClient, MongoError } from 'mongodb';

// Error checking to make sure that the database is running
let client: MongoClient;

// Use connect moethod to connect to the server
// Done is a callback
export const connect = (uri: string) => {
  return new Promise((resolve, reject) => {
    // If the database is already connected then we're done
    if (client) {
      console.log('Client already exists pogger');
      resolve();
    }

    // Otherwise, let's connect using the given url
    // We get err & db passed into the callback
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err: MongoError) => {
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
export const get = (): MongoClient => {
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
