import { Photon } from '@generated/photon';

const myPhoton = new Photon();

export const addPassengerProjector = async ({ content }, photon = myPhoton) => {
  const parsedContent= JSON.parse(content.toString());
  const { userType } = parsedContent;
  if (userType === 'passenger') {
    const data = {
      firstName: parsedContent.firstName,
      lastName: parsedContent.lastName,
      status: parsedContent.status,
      phone_number: parsedContent.phone_number,
      email: parsedContent.email,
      createdAt: parsedContent.createdAt
    }
    await photon.passengers.create({ data });
  }
}