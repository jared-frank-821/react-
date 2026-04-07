import React from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useRef, useState } from 'react';
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  alt?:string;
  src?:string | React.ReactNode;
  size?:number|'large'|'small'|'medium';
  shape?:'circle'|'square';
  draggable?:boolean;
  icon?:React.ReactNode;
  children?:React.ReactNode;
  style?:CSSProperties;
}
const Avatar = (props: AvatarProps) => {
  const { alt, src, size = 'medium', shape = 'circle', draggable = true, icon, children, style: customStyle } = props;

  // 1. 只有当 size 是字符串（small/large等）时，才添加对应的 class
  const textRef=useRef<HTMLSpanElement>(null);
  const [scale,setScale]=useState(1);
  const wraperRef=useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const node = textRef.current;
    const wraperNode = wraperRef.current;
    if (!node || !wraperNode) {
      return;
    }
  const reRender=()=>{
    const wraperWidth = wraperNode.offsetWidth;
    const textWidth = node.offsetWidth;
    const gap = 4;
  
    const scale = wraperWidth - gap * 2 < textWidth ? 
      (wraperWidth - gap * 2) / textWidth : 1;
    setScale(scale);
  }
    const ob=new ResizeObserver(reRender);
    ob.observe(node);
  
  }, [])
  const cls = classNames('ant-avatar', {
    [`ant-avatar-${size}`]: typeof size === 'string', 
    [`ant-avatar-${shape}`]: shape,
    'ant-avatar-image': src, // 如果有图片，通常需要这个类
    'ant-avatar-icon': icon,   // 如果有图标，通常需要这个类
  });

  // 2. 合并样式：如果是数字，生成尺寸样式；如果是字符串，则不生成尺寸样式
  const sizeStyle: CSSProperties = typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: `${size}px`,
    fontSize: icon ? `${size / 2}px` : undefined,
  } : {};

  // 3. 将计算出的 sizeStyle 与用户传入的 customStyle 合并
  const style = { ...sizeStyle, ...customStyle };
  const textStyle: CSSProperties = {
    lineHeight: typeof size === 'number' ? `${size}px` : undefined,
    // 关键点：将位移和缩放写在一起，并确保 transform-origin 为 center
    transform: `scale(${scale}) translateX(-50%)`,
    transformOrigin: '0 center', 
  };

  return (
    <span
      className={cls}
      {...props}
      ref={wraperRef}
      style={style}
    >
      {icon ? icon : null}
      {src ? (typeof src === 'string' ? <img src={src} alt={alt} draggable={draggable} /> : src) : null}
      {children ? (typeof children === 'string' ? <span
        style={textStyle}
        ref={textRef}
        className="ant-avatar-string">{children}</span> : children) : null}
    </span>
  );
}
export default Avatar;
