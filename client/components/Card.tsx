import NextImage from 'next/image';
import Link from 'next/link';
import React, { HTMLAttributes, ImgHTMLAttributes } from 'react';
import EmailIcon from './icons/Email';
import LocationIcon from './icons/Location';
import PhoneIcon from './icons/Phone';
import css from '../styles/card.module.css';

type CardImageProps = Contact & ImgHTMLAttributes<HTMLImageElement>;
type CardProps = Contact & HTMLAttributes<HTMLDivElement>;

function CardImage(props: CardImageProps) {
  const { email, full_name, gender } = props;
  const src = `https://i.pravatar.cc/525?u=${email}`;
  const placeholder = `/avatar_${gender.toLowerCase()}.png`;

  return (
    <NextImage
      src={src}
      blurDataURL={placeholder}
      placeholder="blur"
      width={525}
      height={525}
      loading="lazy"
      alt={full_name}
      className={css.image}
    />
  );
}

function Card(props: CardProps) {
  const {
    forename,
    surname,
    address,
    city,
    state,
    zip,
    email,
    phone,
    bio,
    ...otherProps
  } = props;

  const encodedAddress = encodeURIComponent(
    `${address},${city},${state},${zip}`
  );
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div {...otherProps} className={css.root}>
      <CardImage {...props} />

      <div className={css.overlay}>
        <h3 className={css.title}>
          {forename}
          <br />
          {surname}
        </h3>
        <span>{`${city}, ${state}`}</span>
        <p className={css.blurb}>{bio}</p>

        <footer className={css.footer}>
          <Link href={`mailto:${email}`}>
            <a className={css.link}>
              <EmailIcon />
            </a>
          </Link>

          <Link href={`tel:${phone}`}>
            <a className={css.link}>
              <PhoneIcon />
            </a>
          </Link>

          <Link href={mapUrl}>
            <a target="googleMaps" className={css.link}>
              <LocationIcon />
            </a>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Card;
