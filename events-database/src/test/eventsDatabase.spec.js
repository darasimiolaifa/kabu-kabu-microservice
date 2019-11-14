import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { name, random, internet } from 'faker';
import server from '../index';
import databaseMethods from '../db';
import commandHandler from '../commandHandlers';
import amqp from 'amqplib/channel_api';
import mq from '../rabbitmq';
import amqplibMockLibrary from './amqplibMockLibrary';


chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
let request;

describe('Event Database', () => {
  before(() => request = chai.request(server).keepOpen());
  afterEach(() => sinon.restore());
  
  after(() => request.close());  

  context('Connection errors', () => {
    it('should catch database operation errors', async () => {
      const data = [
        { status: 'yes' },
        { status: 'No' }
      ]
      const response = await databaseMethods.insertEvent(data);
      response.should.have.property('error');
    });
    
    it('should mimick an error in the try block for rabbitmq publishing', async () => {
      sinon.stub(amqp, 'connect').throws();
      const response = await mq.publish('exchange', 'messageKey', 'messagePayload');
      response.should.have.property('error');
    });
    it('should mimick an error in the try block for rabbitmq consuming', async () => {
      sinon.stub(amqp, 'connect').throws();
      const response = await mq.consume('exchange', 'queueName', 'messageKey', 'invokeFunction');
      response.should.have.property('error');
    });
  });
  
  context('Command handlers', () => {
    const { createUserHandler } = commandHandler;
    const data = {
      content: Buffer.from(JSON.stringify({
        email: internet.email(),
      }))
    };
    it('should handle when the user is registering for the first time', async () => {
      const mySpy = sinon.spy(({ content }) => JSON.parse(content.toString()));
      amqplibMockLibrary(amqp, data);
      await createUserHandler(data);
      await mq.consume('kabu-kabu', 'queue', 'messageKey', mySpy);
      mySpy.should.have.been.calledWith(data);
    });
    
    it('should handle when user is deactivated and wants to re-register', async () => {
      const currentUser = [
        { status: 'activated'},
        { status: 'deactivated' }
      ];
      const mySpy = sinon.spy(({ content }) => JSON.parse(content.toString()));
      amqplibMockLibrary(amqp, data);
      sinon.stub(databaseMethods, 'findEvent').returns(currentUser);
      await createUserHandler(data);
      await mq.consume('kabu-kabu', 'queue', 'messageKey', mySpy);
      mySpy.should.have.been.calledWith(data);
    });
    
    it('should catch an already registered user wants to register again.', async () => {
      const currentUser = [
        { status: 'unactivated'},
        { status: 'activated' }
      ];
      const mySpy = sinon.spy(({ content }) => JSON.parse(content.toString()));
      amqplibMockLibrary(amqp, data);
      sinon.stub(databaseMethods, 'findEvent').returns(currentUser);
      await createUserHandler(data);
      await mq.consume('kabu-kabu', 'queue', 'messageKey', mySpy);
      mySpy.should.have.been.calledWith(data);
    });
  });
});
