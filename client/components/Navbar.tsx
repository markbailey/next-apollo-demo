import Link from 'next/link';
import React from 'react';
import css from '../styles/navbar.module.css';

function Navbar() {
  return (
    <header className={css.root}>
      <Link href="/">Back Home</Link>
    </header>
  );
}

export default Navbar;
