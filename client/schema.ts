import casual from 'casual';

casual.define('contact', () => ({
  full_name: casual.full_name,
  forename: casual.first_name,
  surname: casual.last_name,
  address: casual.address,
  city: casual.city,
  state: casual.state,
  zip: casual.zip(5),
  country: casual.country,
  email: casual.email,
  phone: casual.phone,
  bio: casual.words(10)
}));

export const typeDefs = `#graphql
  type Contact {
    full_name: String!
    forename: String!
    surname: String!
    gender: String!
    address: String!
    city: String!
    state: String!
    zip: String!
    country: String!
    email: String!
    phone: String!
    bio: String!
  }

  type Query {
    name: String!
    contacts(skip: Int!, first: Int!): [Contact]!
  }
`;

export const resolvers = {
  Query: {
    name: () => casual.full_name,
    contacts: (root: unknown, args: ContactsArgs) =>
      Array.from({ length: 2000 }, () => ({
        ...casual.contact,
        gender: casual.random_value(['Male', 'Female']) as string
      })).slice(args.skip, args.skip + args.first)
  }
};
