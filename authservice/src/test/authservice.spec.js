import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { internet, name, phone } from 'faker';
import amqp from 'amqplib/channel_api';
import authController from '../controllers';
import mq from '../rabbitmq';
import server from '../index';
import amqplibMockLibrary from './amqplibMockLibrary';


chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

let request;
describe('Auth service', () => {
  before(() => request = chai.request(server).keepOpen());
  afterEach(() => sinon.restore());
  
  after(() => request.close());
  
  context('Registration route', () => {
    const badUser = {
      firstName: '',
      lastName: 12345,
      email: phone.phoneNumber(),
      password: internet.email(),
      phone_number: internet.email(),
      userType: 'Admin'
    };
    
    const goodUser = {
      firstName: name.firstName(),
      lastName: name.lastName(),
      email: internet.email(),
      password: internet.password(),
      phone_number: phone.phoneNumber('123456789'),
      userType: 'passenger'
    };
    
    const req = {
      body: {
        email: internet.email(),
        password: internet.password()
      }
    };
    
    const res = {
      status: () => {},
      json: () => {}
    };
        
    it('should reject a bad user object for registration', async () => {
      const response = await request.post('/register')
        .send(badUser);
      response.should.have.status(422);
    });
    
    it('should send a 400 response code for users that already exist', async () => {
      sinon.stub(res, 'status').returnsThis();      
      amqplibMockLibrary(amqp, 400);
      await authController.register(req, res);
      res.status.should.have.been.calledWith(400);      
    });
    
    it('should send a success code for a successfully registered user', async () => {
      amqplibMockLibrary(amqp, 200);
      const response = await request.post('/register')
        .send(goodUser);
      response.should.have.status(200);
    });
    
    it('should mimick an error in the try block for registration', async () => {
      sinon.stub(mq, 'publish').throws();
      const response = await authController.register(req, res);
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
});
