import React from 'react';
import NextImage from 'next/image';
import css from '../styles/skeleton.module.css';
import classNames from '../utilities/classNames';

function Skeleton() {
  const getClassNames = (initialClassName: string) =>
    classNames(initialClassName, css.skeleton);

  return (
    <div className={getClassNames(css.root)}>
      <NextImage
        src="/skeleton-bg.png"
        width={525}
        height={525}
        loading="lazy"
        alt="Skeleton Placeholder"
        className={css.image}
      />

      <div className={css.overlay}>
        <div className={getClassNames(css.title)} />
        <div className={getClassNames(css.title)} />

        <div className={getClassNames(css.subtitle)} />

        <div className={getClassNames(css.blurb)} />
        <div className={getClassNames(css.blurb)} />

        <footer className={css.footer}>
          <div className={getClassNames(css.icon)} />
          <div className={getClassNames(css.icon)} />
          <div className={getClassNames(css.icon)} />
        </footer>
      </div>
    </div>
  );
}

export default Skeleton;
