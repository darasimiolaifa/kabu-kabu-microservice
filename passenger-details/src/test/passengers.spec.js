import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { name, random, phone, internet } from 'faker';
import { Photon } from '@generated/photon';
import server from '../index';
import amqp from 'amqplib/channel_api';
import mq from '../rabbitmq';
import amqplibMockLibrary from './amqplibMockLibrary';
import { addPassengerProjector } from '../projectors';


chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
let request;

describe('Passengers', () => {
  before(() => request = chai.request(server).keepOpen());
  afterEach(() => sinon.restore());
  
  after(() => request.close());
  
  context('Add Passenger Reactor', () => {
    const photon = new Photon();
    const data = {
      content: Buffer.from(JSON.stringify({  
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        phone_number: phone.phoneNumber(),
        createdAt: new Date(Date.now()),
        status: 'Unverified',
        userType: 'passenger'
      }))
    }
    
    it('should test that the passenger was added successfully to the database', async () => {
      const passengers = sinon.stub(photon.passengers);
      const myPhoton = {
        passengers
      };
      passengers.create.returns({ id: random.uuid() });
      amqplibMockLibrary(amqp, data);
      await addPassengerProjector(data, myPhoton);
      passengers.create.calledOnce.should.equal(true);
    });
    
    it('should test the rabbitmq library consume function', async () => {
      const mySpy = sinon.spy(addPassengerProjector);
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
