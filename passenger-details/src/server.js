import { ApolloServer } from 'apollo-server';
import { objectType, makeSchema, stringArg } from 'nexus';
import { Photon } from '@generated/photon';

const photon = new Photon();

const Passenger = objectType({
  name: "Passenger",
  description: "The passenger model of the app",
  definition(t) {
    t.id('id')
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('phone_number')
    t.string('status')
    t.int('trips', {
      nullable: true,
      description: "The number of completed trips by the passenger"
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
});

const Query = objectType({
  name: 'Query',
  description: 'Represents a collection of all the query types in the model',
  definition(t) {
    t.list.field('passengers', {
      type: 'Passenger',
      resolve: () => photon.passengers.findMany({})
    })
  },
});


const schema = makeSchema({
  types: [Query, Passenger],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/index.ts`,
  },
})

const server = new ApolloServer({
  schema
});

export default server;
