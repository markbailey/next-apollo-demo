import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs, resolvers } from './schema';

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();
app.use(cors());
app.use('/graphql', bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve as () => void)
);

console.log(`🚀 Server ready at http://localhost:4000`);
