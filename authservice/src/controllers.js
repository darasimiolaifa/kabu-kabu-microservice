import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mq from './rabbitmq';

const file = path.resolve(__dirname, '../keys/private.pem');
const privateKey = fs.readFileSync(file, { encoding: 'utf-8' });

class AuthController {
  static async register(req, res) {
    const { body: { email, password }, hostname } = req;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdAt = new Date(Date.now());
    try {
      await mq.publish('kabu-kabu', 'COMMAND_CREATE_USER', JSON.stringify({
        ...req.body,
        createdAt,
        hostname,
        password: hashedPassword
      }));
      await mq.consume('kabu-kabu', 'RESPONSES', email, ({ content }) => {
        const status = JSON.parse(content.toString());
        if(status === 400) {
          return res.status(status).json({ status, message: 'Username already exist.' });
        }
        // const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256' });
        const message = 'Registration successful. You will receive an account verification mail soon.'
        return res.status(status).json({ status, message });
      });
    } catch (error) {
      return { error };
    }
  }
}

export default AuthController;
