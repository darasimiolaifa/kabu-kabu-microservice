import { ApolloServer } from 'apollo-server';
import { objectType, makeSchema, stringArg } from 'nexus';
import { Photon } from '@generated/photon';

const photon = new Photon();

const Driver = objectType({
  name: "Driver",
  description: "The passenger model of the app",
  definition(t) {
    t.id('id')
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('phone_number')
    t.string('drivers_license')
    t.string('status')
    t.int('trips', {
      nullable: true,
      description: "The number of completed trips by the passenger"
    })
    t.string('createdAt')
    t.list.field('taxis', {
      type: 'Taxi',
      resolve: (root, _,) => photon.taxis.findMany({ where: { id: root.taxi }})
    })
  },
});

const Taxi = objectType({
  name: "Taxi",
  description: "The taxi model of the app",
  definition(t) {
    t.id('id')
    t.string('manufacturer')
    t.string('model')
    t.int('capacity')
    t.string('year')
    t.string('color')
    t.string('vehicle_picture')
    t.string('plate_number')
    t.string('createdAt')
    t.list.string('vehicle_documnets')
    t.list.string('ownership_documnets')
  },
});

const Query = objectType({
  name: 'Query',
  description: 'Represents a collection of all the query types in the model',
  definition(t) {
    t.list.field('drivers', {
      type: 'Driver',
      resolve: () => photon.drivers.findMany({})
    })
  },
});


const schema = makeSchema({
  types: [Query, Driver, Taxi],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/index.ts`,
  },
})

const server = new ApolloServer({
  schema
});

export default server;
