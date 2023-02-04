import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Button, { ButtonProps } from './Button';
import ArrowUpIcon from './icons/ArrowUp';
import css from '../styles/scroll-to-top.module.css';
import classNames from '../utilities/classNames';
import { mount } from '../utilities/show';

interface ScrollToTopProps extends ButtonProps {
  offset: number;
}

function ScrollToTop(props: ScrollToTopProps) {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { offset, className, ...otherProps } = props;
  const newClassName = classNames(css.root, className, show ? css.show : null);

  const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const onTransitionEnd = useCallback(
    (event: TransitionEvent) => {
      if (!(event.target as HTMLButtonElement).classList.contains(css.show))
        setRender(false);
      buttonRef.current?.removeEventListener('transitionend', onTransitionEnd);
    },
    [setRender]
  );

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const isScrolled = scrollTop > offset;

    if (isScrolled && !render) setRender(true);
    else setShow(isScrolled);

    if (buttonRef.current?.getAttribute('listener') !== 'true')
      buttonRef.current?.addEventListener('transitionend', onTransitionEnd);
  }, [offset, render, setShow, setRender, onTransitionEnd]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (render) setShow(true);
  }, [render, setShow]);

  return mount(
    render,
    createPortal(
      <Button
        ref={buttonRef}
        {...otherProps}
        className={newClassName}
        onClick={onClick}
        title="Scroll to top"
      >
        <ArrowUpIcon />
      </Button>,
      document.body
    )
  );
}

export default ScrollToTop;
