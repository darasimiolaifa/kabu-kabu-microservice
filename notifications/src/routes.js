import mq from './rabbitmq';
import { mailReactor } from './reactors';

export default (app) => {
  mq.consume('kabu-kabu', 'DB_EVENTS_NOTIFICATIONS', 'USER_DETAILS', (message) => mailReactor(message));
}