import express from 'express';
import server from './server';
import mq from './rabbitmq';
import { addPassengerProjector } from './projectors';

const app = express();
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mq.consume('kabu-kabu', 'DB_EVENTS_PASSENGERS', 'USER_DETAILS', (message) => addPassengerProjector(message));
app.listen(port, () => console.log(`App listening on port ${port}`));
