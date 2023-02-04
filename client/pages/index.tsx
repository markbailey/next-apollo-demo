import React from 'react';
import Link from 'next/link';
import Name from '../components/Name';

const Page = () => (
  <div>
    Welcome, <Name />
    <br />
    <br />
    <Link href="/about">About</Link>
    {' | '}
    <Link href="/contacts">Contacts</Link>
  </div>
);

export default Page;
