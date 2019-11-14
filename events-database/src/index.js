import express from 'express';
import addRoutes from './routes';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

addRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
