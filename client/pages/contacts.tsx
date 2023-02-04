import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import client from '../client';
import Card from '../components/Card';
import mapToJSX from '../utilities/mapToJSX';
import { mount } from '../utilities/show';
import gridStyles from '../styles/grid.module.css';
import Skeleton from '../components/Skeleton';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import css from '../styles/page.module.css';
import classNames from '../utilities/classNames';
import ScrollToTop from '../components/ScrollToTop';
import withRenderClientSide from '../components/hoc/withRenderClientSide';

interface Result {
  contacts: Contact[];
}

interface ContactsPageProps {
  data: Contact[];
  perPage: number;
  total: number;
}

// GraphQL query
const query = (skip: number = 0) => gql`
  query Contacts {
    contacts(skip: ${skip}, first: 20) {
      full_name
      forename
      surname
      gender
      address
      city
      state
      zip
      country
      email
      phone
      bio
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query<Result>({
    query: query()
  });

  return {
    props: {
      data: data.contacts,
      perPage: 20,
      total: 2000
    }
  };
}

function ContactsPage(props: ContactsPageProps) {
  const { data: initialData, perPage, total } = props;
  const [skip, setSkip] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(initialData);
  const { loading, data } = useQuery<Result>(query(skip), { skip: skip === 0 });

  const className = classNames(css.root, css.with_navbar);

  useEffect(() => {
    if (data !== undefined) {
      setContacts((state) => [...state, ...data.contacts]);
      setShowSkeleton(false);
    }
  }, [data, setContacts, setShowSkeleton]);

  useEffect(() => {
    if (loading) setShowSkeleton(true);
  }, [loading, setShowSkeleton]);

  return (
    <div className={className}>
      <Navbar />
      <div className={gridStyles.root}>
        {mapToJSX(contacts, Card)}
        {mount(showSkeleton, mapToJSX([...new Array(perPage)], Skeleton))}
      </div>

      {mount(
        contacts.length < total,
        <Button
          onClick={() => setSkip((state) => state + perPage)}
          disabled={loading}
          style={{ margin: '1rem auto 0', display: 'block' }}
        >
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      )}

      {withRenderClientSide(<ScrollToTop offset={0} />)}
    </div>
  );
}

export default ContactsPage;
