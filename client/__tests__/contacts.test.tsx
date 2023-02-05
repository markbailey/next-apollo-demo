/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React, {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactElement
} from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ContactsPage, { query as contactsQuery } from '../pages/contacts';
import { createContact, resolvers } from '../schema';
import { InMemoryCache } from '@apollo/client';

const linkChildren = ({ children, href }) =>
  Children.map(children, (child: ReactElement) =>
    cloneElement(child, { href })
  );

jest.mock('next/link', () => linkChildren);

const data: Contact[] = [...new Array(20)].map(() => ({
  ...createContact(),
  'data-card': true
}));

const contactsMock = {
  request: { query: contactsQuery() },
  result: { data }
};

const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  <MockedProvider
    mocks={[contactsMock]}
    addTypename={false}
    resolvers={resolvers}
    cache={new InMemoryCache()}
  >
    {children}
  </MockedProvider>
);

describe('Contacts page component', () => {
  it('Verify that Contacts page renders a list of Card components', async () => {
    const { container } = render(
      <ContactsPage data={data} perPage={20} total={2000} />,
      { wrapper: Wrapper }
    );

    const cards = container.querySelectorAll('[data-card]');
    expect(cards).toHaveLength(data.length);
  });
});
