import commandHandlers from './commandHandlers';
import mq from './rabbitmq';

const { createUserHandler } = commandHandlers;

export default (app) => {
  mq.consume('kabu-kabu', 'CREATE', 'COMMAND_CREATE_USER', (message) => createUserHandler(message));
}
