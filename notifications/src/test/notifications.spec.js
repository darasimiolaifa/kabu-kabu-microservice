import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sgMail from '@sendgrid/mail';
import { name, random, internet } from 'faker';
import server from '../index';
import amqp from 'amqplib/channel_api';
import mq from '../rabbitmq';
import amqplibMockLibrary from './amqplibMockLibrary';
import { mailReactor } from '../reactors';


chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
let request;

describe('Notifications', () => {
  before(() => request = chai.request(server).keepOpen());
  afterEach(() => sinon.restore());
  
  after(() => request.close());
  
  context('Mail Reactor', () => {
    const data = {
      content: Buffer.from(JSON.stringify({
        firstname: name.firstName(),
        email: internet.email(),
        action: 'USER_REGISTERED'
      }))
    };
    it('should successfully send mail when user registers', async () => {
      const mailResponse = [
        { request: true }
      ];
      sinon.stub(sgMail, 'send').returns(mailResponse);
      const response = await mailReactor(data);
      response.should.deep.equal({ message: 'Mail sent successfully.', success: true });
    });
    
    it('should simulate mail sending error', async () => {
      sinon.stub(sgMail, 'send').throws();
      const response = await mailReactor(data);
      response.should.have.property('error');
    });
    
    it('should test the rabbitmq library consume function', async () => {
      const mySpy = sinon.spy(mailReactor);
      amqplibMockLibrary(amqp, data);
      await mq.consume('kabu-kabu', 'queue', 'messageKey', mySpy);
      mySpy.should.have.been.calledWith(data);
    });
    
    it('should test the rabbitmq library publish function', async () => {
      amqplibMockLibrary(amqp, data);
      const mySpy = sinon.spy(mq, 'publish');
      await mySpy('kabu-kabu', 'queue', 'messageKey');
      mySpy.getCall(0).args[0].should.equal('kabu-kabu');
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
