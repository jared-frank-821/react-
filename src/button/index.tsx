import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps{
  className?:string;
  type?:'primary'|'normal'|'dashed'|'text'|'link';
  children:React.ReactNode;
  backgroundColor?:string;
  style?:React.CSSProperties;
  size?:'large'|'small'|'medium';
  onClick?:React.MouseEventHandler<HTMLButtonElement>;
  onBlur?:React.FocusEventHandler<HTMLButtonElement>;
}
const Button =(props:ButtonProps)=>{
  const {className,type='normal',children,style,size='medium',onClick,onBlur}=props;
  const cls=classNames({
    'ant-btn':true,
    [`ant-btn-${size}`]: size,
    [`ant-btn-${type}`]: type,  // 使用模板字符串
    [className as string]:className
  })
  return <button className={cls} style={style} onClick={onClick} onBlur={onBlur}>{children}</button>
}
export default Button;