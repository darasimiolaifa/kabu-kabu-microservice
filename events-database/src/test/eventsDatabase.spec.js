import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { name, random, internet } from 'faker';
import server from '../index';
import databaseMethods from '../db';
import eventsController from '../controller';

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

describe('Event Database', () => {
  let id;
  describe('Create events', () => {
    it('should create an event entry', async () => {
      const event = {
        aggregatorId: random.uuid(),
        aggregatorType: 'User',
        eventType: 'USER_REGISTERED',
        payload: {
          firstName: name.firstName(),
          lastname: name.lastName(),
          email: internet.email(),
          password: internet.password()
        }
      }
      const response = await chai
        .request(server)
        .post('/events')
        .send(event);
      id = response.body.aggregatorId;
      response.body.should.have.status(200);
      response.body.should.have.property('status', 200);
      response.body.should.have.property('data');
    });
  });
  describe('Get events', () => {
    it('should find events for a particular aggregatorId', async () => {
      const response = await chai
        .request(server)
        .get(`/events/${id}`)
      response.body.should.have.status(200);
      response.body.should.have.property('status', 200);
      response.body.should.have.property('data');
    });
  });
  
  describe('Fakes database connection error', () => {
    it('should fake database connection error in creating events', async () => {
      const req = {
        body: {
          event: 'fake event',
          eventType: 'USER_REGISTERED'
        }
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(databaseMethods, 'insertEvent').returns({ error: 'This is an error.'});
      sinon.stub()
      
      await eventsController.createEvent(req, res);
      res.status.should.have.been.calledWith(500);
    });
    
    it('should fake database connection error in fetching events', async () => {
      const req = {
        params: {
          aggregatorId: id
        }
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(databaseMethods, 'findEvent').returns({ error: 'This is an error.'});
      sinon.stub()
      
      await eventsController.getEvent(req, res);
      res.status.should.have.been.calledWith(500);
    });
  });
});
