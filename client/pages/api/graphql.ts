import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse, IncomingMessage } from 'http';
import { typeDefs, resolvers } from '../../schema';

const server = new ApolloServer({ typeDefs, resolvers });
const startServer = server.start();

export const config = {
  api: { bodyParser: false }
};

export default async function handler(
  request: MicroRequest,
  response: ServerResponse<IncomingMessage>
) {
  await startServer;
  await server.createHandler({ path: '/api/graphql' })(request, response);
}
