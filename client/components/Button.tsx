import React, { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import css from '../styles/button.module.css';
import classNames from '../utilities/classNames';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, className, onClick, ...otherProps } = props;
  const buttonClassName = classNames(css.root, className);
  return (
    <button
      {...otherProps}
      ref={ref}
      className={buttonClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
