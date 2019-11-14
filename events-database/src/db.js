import 'dotenv/config';
import { MongoClient } from 'mongodb';
import dbEventHandler from './dbEventHandler';

const dburl = process.env.DB_URL;
const databaseName = 'kabu-kabu-events';

const client = new MongoClient(
  dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

client.connect().then((connection, error) => {
  const collection = connection.db(databaseName).collection('events');
  const changeStreams = collection.watch();
  changeStreams.on('change', async ({ fullDocument, operationType }) => {
    if(operationType === 'insert') {
      await dbEventHandler(fullDocument);
    }
  });
});

const executeDbQuery = async (query) => {
  try {
    const connection = await client.connect();
    const db = connection.db(databaseName);
    const results = await query(db);
    client.close();
    return results; 
  } catch (error) {
    client.close();
    return { error };
  }
};

export const insertEvent = (event) => {
  const insertQuery = (db) => db.collection('events').insertOne(event);
  return executeDbQuery(insertQuery);
}

export const findEvent = (condition) => {
  const findQuery = (db) => db.collection('events').find(condition).toArray();
  return executeDbQuery(findQuery);
}

export default {
  insertEvent,
  findEvent
};
