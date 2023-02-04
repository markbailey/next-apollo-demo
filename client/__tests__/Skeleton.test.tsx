/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Skeleton from '../components/Skeleton';

describe('Skeleton component', () => {
  it('Verify that component renders and initial state is correct', async () => {
    const { container } = render(<Skeleton />);

    const card = container.querySelector('.root');
    const image = card.querySelector('img');
    const footer = card.querySelector('footer');
    const icons = footer.querySelectorAll('.icon');
    const titles = card.querySelectorAll('.title');
    const blurbs = card.querySelectorAll('.blurb');
    const subTitle = card.querySelector('.subtitle');

    expect(card).not.toBeNull();
    expect(image).not.toBeNull();
    expect(subTitle).not.toBeNull();
    expect(footer).not.toBeNull();

    expect(titles.length).toBe(2);
    expect(blurbs.length).toBe(2);
    expect(icons.length).toBe(3);

    expect(card).toHaveClass('root');
    expect(image).toHaveClass('image');
    expect(footer).toHaveClass('footer');
  });
});
