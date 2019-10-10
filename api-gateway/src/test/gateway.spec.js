import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api-server';


chai.use(chaiHttp);
chai.should();

const server = app.getServer();

describe('API Gateway', () => {
  describe('Index route', () => {
    it('should return a welcome message for the index route', async () => {
      const response = await chai.request(server).get('/');
      response.body.should.have.property('status', 200);
      response.body.should.have.property('message', 'Welcome to the kabu-kabu app.');
    })
  })
})