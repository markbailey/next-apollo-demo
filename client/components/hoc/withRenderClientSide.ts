import { useEffect, useState } from 'react';
import { mount } from '../../utilities/show';

function withRenderClientSide(element: JSX.Element) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return mount(isClient, element);
}

export default withRenderClientSide;
