import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface Result {
  name?: string;
}

export const query = gql`
  query name {
    name
  }
`;

function Name() {
  const { loading, data } = useQuery<Result>(query);
  return <span>{loading ? '..' : data?.name}</span>;
}

export default Name;
