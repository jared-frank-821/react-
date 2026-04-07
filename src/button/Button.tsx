import React from 'react';
import classNames from 'classnames';
import './index.scss';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';

export interface buttonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  type?: 'primary' | 'normal' | 'dashed' | 'text' | 'link';
  children: React.ReactNode;
  backgroundColor?: string;
  style?: CSSProperties;
  size?: 'large' | 'small' | 'medium';
}

const Button = (props: buttonProps) => {
  const {
    className,
    type = 'normal',
    htmlType = 'button',
    children,
    style,
    size = 'medium',
    ...rest
  } = props;

  const cls = classNames(
    'ant-btn',
    {
      [`ant-btn-${size}`]: size,
      [`ant-btn-${type}`]: type,
    },
    className,
  );

  return (
    <button {...rest} type={htmlType} className={cls} style={style}>
      {children}
    </button>
  );
};

export default Button;
