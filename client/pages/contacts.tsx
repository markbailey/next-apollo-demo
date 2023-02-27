import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import client from '../client';
import Card from '../components/Card';
import mapToJSX from '../utilities/mapToJSX';
import { mount } from '../utilities/show';
import classNames from '../utilities/classNames';
import Skeleton from '../components/Skeleton';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import css from '../styles/page.module.css';
import gridStyles from '../styles/grid.module.css';
import InfiniteScroll from '../components/InfiniteScroll';

export interface Result {
  contacts: Contact[];
}

interface ContactsPageProps {
  data: Contact[];
  perPage: number;
  total: number;
}

// GraphQL query
export const query = (skip: number = 0) => gql`
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
  const baseProps = { data: [], perPage: 20, total: 2000 };
  try {
    const { data } = await client.query<Result>({
      query: query()
    });

    return {
      props: {
        ...baseProps,
        data: data.contacts
      }
    };
  } catch (error) {
    return { props: baseProps };
  }
}

function ContactsPage(props: ContactsPageProps) {
  const { data: initialData, perPage, total } = props;
  const [skip, setSkip] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(initialData);
  const { loading, data, error } = useQuery<Result>(query(skip), {
    skip: skip === 0 && initialData.length > 0
  });
  const className = classNames(css.root, css.with_navbar);
  const showNoResults = contacts.length === 0 && !loading && !showSkeleton;

  useEffect(() => {
    if (data !== undefined) {
      setContacts((state) => [...state, ...data.contacts]);
      setShowSkeleton(false);
    }
  }, [data, setContacts, setShowSkeleton]);

  useEffect(() => {
    if (loading) setShowSkeleton(true);
    else if (error !== undefined) setShowSkeleton(false);
  }, [loading, error, setShowSkeleton]);

  return (
    <div className={className}>
      <Navbar title="Contacts" />
      {mount(
        error !== undefined,
        <div className="error_message">
          <strong>Error!</strong>
          <span>, we were unable to communicate with the API server.</span>
          <br />
          <small>{error?.message}</small>
        </div>
      )}

      {mount(showNoResults, <h1>No contacts found</h1>)}

      <div className={gridStyles.root}>
        {mapToJSX(contacts, Card)}
        {mount(showSkeleton, mapToJSX([...new Array(perPage)], Skeleton))}
      </div>

      {mount(
        contacts.length < total,
        <InfiniteScroll
          onTriggered={() => setSkip((state) => state + perPage)}
        />
      )}

      <ScrollToTop offset={0} />
    </div>
  );
}

export default ContactsPage;
