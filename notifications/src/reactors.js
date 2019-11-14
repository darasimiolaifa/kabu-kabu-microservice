import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import sendMail from './sendMail';

const file = path.resolve(__dirname, '../keys/private.pem');
const privateKey = fs.readFileSync(file, { encoding: 'utf-8' });

const generateToken = email => jwt.sign({ email }, privateKey, { algorithm: 'RS256' });

export const mailReactor = async ({ content }) => {
  const { action, firstName, email } = JSON.parse(content.toString());
  if (action === 'USER_REGISTERED') {
    const token = await generateToken(email);
    const verificationLink = `http://localhost:8080/auth/verifyAccount?token=${token}`;
    return sendMail('Verify Account', email, { firstName, verificationLink });
  }
}