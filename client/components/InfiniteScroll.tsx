import { useEffect, useRef, useState } from 'react';

type InfiniteScrollProps = {
  onTriggered(args?: unknown): void;
};

enum Status {
  Idle = 'idle',
  Triggered = 'triggered'
}

function InfiniteScroll(props: InfiniteScrollProps) {
  const [status, setStatus] = useState(Status.Idle);
  const { onTriggered } = props;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatus(Status.Idle);
    const currentElement = elementRef.current;
    const currentObserver = new IntersectionObserver((entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        setStatus(Status.Triggered);
        onTriggered();
      }
    });

    if (currentElement) currentObserver.observe(currentElement);

    return () => {
      if (currentElement) currentObserver.unobserve(currentElement);
    };
  }, [onTriggered]);

  return <div id="infiniteScroll" ref={elementRef} data-status={status} />;
}

export default InfiniteScroll;
