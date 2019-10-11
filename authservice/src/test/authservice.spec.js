import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


chai.use(chaiHttp);
chai.should();

describe('Auth service', () => {
  describe('Index route', () => {
    it('should return a forbidden response for a get query to the index route', async () => {
      const response = await chai.request(server).get('/');
      response.body.should.have.status(403);
      response.body.should.have.property('status', 403);
      response.body.should.have.property('message', 'You cannot query this route');
    });
  });
});
