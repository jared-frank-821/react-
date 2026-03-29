import React from 'react';
import classNames from 'classnames';
import './index.css';

interface ButtonProps{
  className?:string;
  type?:'primary'|'normal'|'dashed'|'text'|'link';
  children:React.ReactNode;
  backgroundColor?:string;
  style?:React.CSSProperties;
}
const Button =(props:ButtonProps)=>{
  const {className,type='normal',children,style}=props;
  const cls=classNames({
    'ant-btn':true,
    [`ant-btn-${type}`]: type,  // 使用模板字符串
    [className as string]:className
  })
  return <button className={cls} style={style}>{children}</button>
}
export default Button;