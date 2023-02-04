import { FC, useEffect, useState } from 'react';
import { mount } from '../../utilities/show';

// HOC (Higher Order COmponent) to render a component only on the client side
// @param (FC<P>) WrappedComponent - React component to render
function withRenderClientSide<P extends {}>(WrappedComponent: FC<P>) {
  return (props: P) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return mount(isClient, <WrappedComponent {...props} />);
  };
}

export default withRenderClientSide;
