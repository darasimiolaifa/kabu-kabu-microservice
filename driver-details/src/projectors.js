import { Photon } from '@generated/photon';

const myPhoton = new Photon();

export const addDriverProjector = async ({ content }, photon = myPhoton) => {
  const parsedContent = JSON.parse(content.toString());
  const { userType, taxi_details } = parsedContent;
  if (userType === 'driver') {
    const data = {
    firstName: parsedContent.firstName,
    lastName: parsedContent.lastName,
    status: parsedContent.status,
    phone_number: parsedContent.phone_number,
    email: parsedContent.email,
    drivers_license: parsedContent.drivers_license,
    createdAt: parsedContent.createdAt
    }
    const { id } = await photon.drivers.create({ data });
    const { vehicle_documents, ownership_documents } = taxi_details;
    await photon.taxis.create({ data: {
      ...taxi_details,
      vehicle_documents: { set: vehicle_documents },
      ownership_documents: { set: ownership_documents },
      createdAt: parsedContent.createdAt,
      driver: {
        connect: { id }
      }
    }});
  }
}