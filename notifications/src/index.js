import express from 'express';
import addRoutes from './routes';

const app = express();
const port = 3002;

addRoutes(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`App listening on port ${port}`));
