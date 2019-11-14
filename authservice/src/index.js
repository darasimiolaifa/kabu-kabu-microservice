import express from 'express';
import addRoutes from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

addRoutes(app);

app.listen(PORT, () => console.log(`Auth service lisening at port ${PORT}`));

export default app;
