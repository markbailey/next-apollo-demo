import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface Results {
  name?: {
    firstName: string;
    lastName: string;
  };
}

const query = gql`
  query name {
    name {
      firstName
      lastName
    }
  }
`;

function Name() {
  const { loading, error, data } = useQuery<Results>(query);
  const { firstName, lastName } = data?.name;
  console.log(data);
  return <span>{loading ? '..' : firstName}</span>;
}

export default Name;
