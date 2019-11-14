import express from 'express';
import server from './server';
import mq from './rabbitmq';
import { addDriverProjector } from './projectors';

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mq.consume('kabu-kabu', 'DB_EVENTS_DRIVERS', 'USER_DETAILS', (message) => addDriverProjector(message));
app.listen(port, () => console.log(`App listening on port ${port}`));
