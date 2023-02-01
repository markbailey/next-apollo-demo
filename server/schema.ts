import { faker } from '@faker-js/faker';

// The GraphQL schema
export const typeDefs = `#graphql
  type Query {
    name: String
  }
`;

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    name: () => faker.name.fullName()
  }
};
