import React from 'react';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query name {
    name
  }
`;

function Name() {
  const { loading, error, data } = useQuery(query);
  console.log(data);
  return <span>{loading ? '..' : data?.name}</span>;
}

export default Name;
