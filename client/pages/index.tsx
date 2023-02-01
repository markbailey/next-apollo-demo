import React from 'react';
import Link from 'next/link';
import withApollo from '../lib/withApollo';
import Name from '../components/Name';

const Page = () => (
  <div>
    Welcome, <Name />
    <br />
    <br />
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
);

export default withApollo({ ssr: true })(Page);
