import mapToJSX from '../utilities/mapToJSX';

const Component = () => <div>Test Component</div>;
const propsArray = [...new Array(10)].map(() => ({}));

describe('mapToJSX utility function', () => {
  it('Verify that function returns an array of react elements', async () => {
    const elements = mapToJSX(propsArray, Component);

    expect(elements).toHaveLength(propsArray.length);
    // Verify that each element is a react element with the correct props and type
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const item = propsArray[i];

      expect(element.type).toBeInstanceOf(Function);
      expect(element.props).toEqual(item);
    }
  });
});
