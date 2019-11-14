import sinon from 'sinon';

export default (amqp, status) => {
  const connection = {
    status,
    createChannel() {
      return this.prepareChannel();
    },
    
    prepareChannel() {
      const channel = {};
      channel.assertExchange = (exchange, mode, options) => {
        return true;
      };
      channel.publish = (exchange, messageKey, mesagePayload) => {
        return true;
      };
      channel.consume = (messageQueue, callback, options) => {
        const response = {
          content: Buffer.from(JSON.stringify(status))
        };
        callback(response);
      };
      channel.assertQueue = (queueName, options) => {
        return { queueName };
      }
      channel.bindQueue = (messageQueue, exchange, messageKey) => {
        return true;
      }
      return channel;
    },
    close() {
      return true;
    }
  }
  
  sinon.stub(amqp, 'connect').returns(connection);
}