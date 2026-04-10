import React, { useContext } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
import MenuContext from './MenuContext';

export interface itemProps extends React.HTMLAttributes<HTMLElement>{
  className?:string;
  title?:string;
  children:React.ReactNode;
  style?:CSSProperties
  icon?:React.ReactNode;
  type?:'group'|'item';
  disabled?:boolean;
  itemKey?: string; // 👇 1. 接口新增 itemKey (去掉原来的 key?: string)
}

const Item =(props:itemProps)=>{
 // 👇 2. 解构出 itemKey (去掉原来的 key)
 const { className, title, children, style, icon, disabled, itemKey, ...rest } = props;

 const ctx = useContext(MenuContext);
 const level = ctx.level;
 
 // 👇 3. 赋值给 menuKey
 const menuKey = itemKey as string; 
 const isOpen = ctx.openKeys?.includes(menuKey) ?? false;
 const isSelected = ctx.selectedKeys.includes(menuKey);

 const cls = classNames(
  'ant-menu-item',
  { 'ant-menu-item-disabled': disabled },
  { 'ant-menu-item-selected': isSelected },
  className
);

const handleClick = () => {
  if (disabled) return;
  ctx.onSelect(menuKey);
};
  const iconEle = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'ant-menu-item-icon' })
    : null;
  return <li role="menuitem" className={cls} style={style} {...rest} onClick={handleClick}>
    {iconEle}
    <span className='ant-menu-title-content'>{children}</span>
  </li>
}
export default Item;