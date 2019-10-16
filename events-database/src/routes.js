import { Router } from 'express';
import EventsController from './controller';

const router = Router();

router
  .get('/events/:aggregatorId', EventsController.getEvent)
  .post('/events', EventsController.createEvent);
  
  export default router;
  