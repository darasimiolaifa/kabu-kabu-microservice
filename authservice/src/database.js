import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
client.on_connect(console.log('Redis server connected.'));

const registerUser = async (username, userData) => {
  try{
    const response = await client.hsetAsync(username, ...userData);
    return response;
  } catch (error) {
    return { error };
  }
}

const fetchUser = async (username) => {
  try {
    const response = await client.hgetAsync(username);
    return response;
  } catch (error) {
    return { error };
  }
}

export default {
  registerUser,
  fetchUser
}