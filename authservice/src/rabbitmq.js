import 'dotenv/config';
import amqp from 'amqplib/channel_api';

const AMQP_URL = process.env.AMQP_URL;

export const publish = async (exchange, messageKey, messagePayload) => {
  try {
    const conn = await amqp.connect(AMQP_URL);
    const channel = await conn.createChannel();
    channel.assertExchange(exchange, 'direct', { durable: true });
    channel.publish(exchange, messageKey, Buffer.from(messagePayload));
    console.log(`New ${messageKey} message published.`);
    setTimeout(() => {
      conn.close();
    }, 500);
  } catch (error) {
    return { error };
  }
}

export const consume = async (exchange, queueName, messageKey, invokeFunction) => {  
  try {
    const conn = await amqp.connect(AMQP_URL);
    const channel = await conn.createChannel();
    channel.assertExchange(exchange, 'direct', { durable: true });
    const { queue: messageQueue } = channel.assertQueue(queueName, { exclusive: false });
    channel.bindQueue(messageQueue, exchange, messageKey);
    channel.consume(messageQueue, (message) => {
      conn.close();
      invokeFunction(message);
    }, { noAck: true } );
  } catch (error) {
    return { error };
  }
}

export default {
  publish,
  consume
}

// docker run -d --hostname my_rabbit --name rabbit13 -p 15672:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management