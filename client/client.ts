import fetch from 'cross-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;
