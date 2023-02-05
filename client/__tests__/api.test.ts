import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers } from '../schema';
import { query as contactsQuery } from '../pages/contacts';
import { query as nameQuery } from '../components/Name';

describe('GraphQL API', () => {
  let server: ApolloServer;

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
  });

  // after the tests we close the server
  afterAll(async () => await server.stop());

  it('Verify the name query is successful and correct data returned', async () => {
    const response = await server.executeOperation({ query: nameQuery });

    // Verify the response data is correct
    expect(typeof response).toBe('object');
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('name');
    expect(typeof response.data.name).toBe('string');
    expect(response.data.name).toBeTruthy();
  });

  it('Verify the contacts query is successful and correct data returned', async () => {
    const response = await server.executeOperation({ query: contactsQuery() });

    // Verify the response data is correct
    expect(typeof response).toBe('object');
    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('contacts');
    expect(response.data.contacts).toHaveLength(20);
  });

  it('Verify the contacts api can return 2000 records', async () => {
    const contacts = [];

    for (let i = 0; i < 100; i++) {
      const { data } = await server.executeOperation({
        query: contactsQuery()
      });

      contacts.push(...data.contacts);
    }

    // Verify the contacts are unique
    expect(contacts).toHaveLength(2000);
  });
});
