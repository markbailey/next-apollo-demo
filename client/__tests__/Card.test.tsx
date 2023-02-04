/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Children, cloneElement, ReactElement } from 'react';
import Card from '../components/Card';
import { createContact } from '../schema';

const linkChildren = ({ children, href }) =>
  Children.map(children, (child: ReactElement) =>
    cloneElement(child, { href })
  );

jest.mock('next/link', () => linkChildren);

describe('Card component', () => {
  it('Verify that Card component renders and initial state is correct', async () => {
    const contact: Contact = createContact();
    const { container } = render(<Card {...contact} />);

    const card = container.querySelector('.root');
    const image = card.querySelector('img');
    const footer = card.querySelector('footer');
    const links = footer.querySelectorAll('a');
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    const span = card.querySelector('span');

    const imageSrc = `https://i.pravatar.cc/525?u=${contact.email}`;
    const address = `${contact.address},${contact.city},${contact.state},${contact.zip}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

    expect(card).not.toBeNull();
    expect(image).not.toBeNull();
    expect(h3).not.toBeNull();
    expect(p).not.toBeNull();
    expect(span).not.toBeNull();

    expect(card).toHaveClass('root');
    expect(image).toHaveClass('image');
    expect(h3).toHaveClass('title');
    expect(p).toHaveClass('blurb');
    expect(footer).toHaveClass('footer');

    expect(image.src).toContain(encodeURIComponent(imageSrc));
    expect(image.alt).toBe(contact.full_name);

    expect(h3.innerHTML).toContain(contact.forename);
    expect(h3.innerHTML).toContain(contact.surname);
    expect(span.innerHTML).toContain(`${contact.city}, ${contact.state}`);
    expect(p.innerHTML).toContain(contact.bio);

    expect(links.length).toBe(3);
    expect(links.item(0).href).toContain(`mailto:${contact.email}`);
    expect(links.item(1).href).toContain(`tel:${contact.phone}`);
    expect(links.item(2).href).toContain(mapUrl);
  });
});
