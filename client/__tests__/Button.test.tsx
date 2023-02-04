/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
  it('Verify that Button component renders and onClick fires', async () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick}>Click me</Button>);
    const button = container.querySelector('button');
    button?.click();

    expect(button).not.toBeNull();
    expect(button).toHaveClass('root');
    expect(button).toHaveTextContent('Click me');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
