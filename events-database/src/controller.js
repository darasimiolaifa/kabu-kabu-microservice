import database from './db';


class Controller {
  static async createEvent(req, res) {
    const { body: event } = req;
    const results = await database.insertEvent(event);
    if (results.error) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
    return res.status(200).json({ status: 200, data: results.ops[0] });
  }
  
  static async getEvent(req, res) {
    const { params: { aggregatorId } } = req;
    const results = await database.findEvent(aggregatorId);
    if (results.error) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
    return res.status(200).json({ status: 200, data: results });
  }
}

export default Controller;
