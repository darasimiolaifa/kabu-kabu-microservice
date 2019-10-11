import 'dotenv/config';
import gateway from 'fast-gateway';
import cors from 'cors';
import helmet from 'helmet';


const PORT = process.env.PORT || 8080;

const apiServer = gateway({
  middleware: [
    cors(),
    helmet()
  ],
  routes: [
    {
      prefix: '/auth',
      target: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  ]
});

apiServer.get('/', (req, res) => res.send({ status: 200, message:'Welcome to the kabu-kabu app.' }));

apiServer.start(PORT).then(() => console.log(`Server started at port ${PORT}`));

export default apiServer;
