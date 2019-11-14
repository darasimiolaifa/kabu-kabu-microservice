import 'dotenv/config';
import gateway from 'fast-gateway';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 8080;

const apiServer = gateway({
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cors(),
    helmet()
  ],
  routes: [
    {
      prefix: '/auth',
      target: 'http://localhost:3000',
      middlewares:[],
      methods: ['GET', 'POST'],
    },
  ]
});

apiServer.get('/', (req, res) => res.send({ status: 200, message:'Welcome to the kabu-kabu app.' }, 200));

apiServer.start(PORT).then(() => console.log(`Server started at port ${PORT}`));

export default apiServer;
