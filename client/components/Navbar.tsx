import Link from 'next/link';
import React from 'react';
import css from '../styles/navbar.module.css';

function Navbar(props: { title: string }) {
  const { title } = props;
  return (
    <header className={css.root}>
      <strong className={css.title}>{title}</strong>
      <Link href="/">
        <a>Home</a>
      </Link>
    </header>
  );
}

export default Navbar;
