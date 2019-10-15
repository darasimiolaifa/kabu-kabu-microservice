import { MongoClient } from 'mongodb';

const dburl = 'mongodb://localhost:27017/?replicaSet=rs';
const client = new MongoClient(
  dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const executeDbQuery = async (query) => {
  try {
    const connection = await client.connect();
    console.log('Connected to database server.')
    const db = connection.db('kabu-kabu-events');
    const results = query(db);
    client.close();
    console.log('Connection to database server closed.')
    return results; 
  } catch (error) {
    return { error };
  }
};

export const insertEvent = (event) => {
  const insertQuery = (db) => db.collection('events').insertOne(event);
  return executeDbQuery(insertQuery);
}

export const findEvent = (aggregatorId) => {
  const findQuery = (db) => db.collection('events').find({ aggregatorId }).toArray();
  return executeDbQuery(findQuery);
}

export default {
  insertEvent,
  findEvent
};
