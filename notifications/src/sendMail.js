import 'dotenv/config';
import sgMail from '@sendgrid/mail';
import emailTemplates from './emailTemplates';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  verifyAccount
} = emailTemplates;

const generateMail = (category, data) => {
  switch (category) {
    case 'Verify Account':
      return { subject: 'Confirm your Email Account', mail: verifyAccount(data) };
    default:
      return false;
  }
};

export default async (category, receiver, data) => {
  try {
    const { subject, mail: html } = generateMail(category, data);
    const msg = {
      to: receiver,
      from: 'support@kabu-kabu.herokuapp.com',
      subject,
      html
    };
    const response = await sgMail.send(msg);
    if (response[0] && response[0].request) {
      console.log(`A ${category} mail was sent to ${data.firstName} at ${receiver} successfully.`);
      return { message: 'Mail sent successfully.', success: true };
    }
  } catch (error) {
    return { error };
  }
}