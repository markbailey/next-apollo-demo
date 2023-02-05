import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers } from '../schema';
import { query as contactsQuery } from '../pages/contacts';

describe('GraphQL API', () => {
  let server: ApolloServer;

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
  });

  // after the tests we close the server
  afterAll(async () => await server.stop());

  it('Verify the query successful and correct data returned', async () => {
    const response = await server.executeOperation({ query: contactsQuery() });

    // Verify the response data is correct
    expect(typeof response).toBe('object');
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('contacts');
    expect(response.data.contacts).toHaveLength(20);
  });
});
