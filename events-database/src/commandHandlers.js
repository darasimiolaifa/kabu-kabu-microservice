import database from './db';
import mq from './rabbitmq';
import { replayUserDetails } from './replayFunctions';

const createUserHandler = async ({ content }) => {
  let message;
  const payload = JSON.parse(content.toString());
  const aggregator = {
    id: payload.email,
    type: 'User'
  }
  const result = await database.findEvent({ aggregator });
  const records = result.length;
  if (records === 0 || (records > 1 && replayUserDetails(result).status === 'deactivated')) {
    message = 200;
    payload.status = 'Unverified';
    const event = {
      eventType: "USER_REGISTERED",
      aggregator,
      payload,
    }
    await database.insertEvent(event);
  } else message = 400;

  mq.publish('kabu-kabu', aggregator.id, JSON.stringify(message));
}

export default {
  createUserHandler
}
