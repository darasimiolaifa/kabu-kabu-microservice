import mq from './rabbitmq';

export default async (fullDocument) => {
  const { eventType, payload } = fullDocument;
  let routingKey;
  switch(eventType) {
    case 'USER_REGISTERED':
    case 'USER_DETAILS_UPDATED':
      delete payload.password;
      payload.action = eventType;
      routingKey = 'USER_DETAILS';
      break;
    default:
      break;
  }
  await mq.publish('kabu-kabu', routingKey, JSON.stringify(payload));
}