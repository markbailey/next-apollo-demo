import classNames from '../utilities/classNames';

describe('classNames utility function', () => {
  it('Verify that className string is constructed and is valid', () => {
    const args = [' foo', 'bar ', ' baz ', '', ' ', null, undefined];
    const className = classNames(...args);
    expect(className).toEqual('foo bar baz');
  });
});
