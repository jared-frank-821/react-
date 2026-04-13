import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
import MenuContext from './MenuContext';
import Item from './Item';
import SubMenu from './SubMenu';

export interface MenuItem {
  key: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuItem[];
  type?: 'group';
  itemKey?: string;
}

export interface menuProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>{
  className?:string;
  type?:'primary'|'normal'|'dashed'|'text'|'link';
  children?:React.ReactNode;
  mode?:'horizontal'|'vertical'|'inline';
  backgroundColor?:string;
  style?:CSSProperties;
  size?:'large'|'small'|'medium';
  defaultSelectedKeys?:string[];
  selectedKeys?:string[];
  theme?:'light'|'dark';
  inlineIndent?:number;
  defaultOpenKeys?:string[];
  openKeys?:string[];
  accordion?:boolean;
  onSelect?: (key: string) => void;
  items?: Array<object>
}

const Menu =(props:menuProps)=>{
  const {
    className,
    children,
    style,
    mode='vertical',
    theme='light',
    inlineIndent=24,
    defaultSelectedKeys=[],
    defaultOpenKeys=[],
    accordion=true,
    items,
    onSelect: onSelectProp,
    selectedKeys,
    ...rest
  } =props;
  // 受控模式：使用传入的 selectedKeys；非受控模式：使用内部状态
  const [selectedKeysInternal, setSelectedKeysInternal] = useState<string[]>(defaultSelectedKeys);
  const currentSelectedKeys = selectedKeys !== undefined ? selectedKeys : selectedKeysInternal;
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const handleSelect = (key: string) => {
    if (selectedKeys === undefined) {
      setSelectedKeysInternal([key]);
    }
    onSelectProp?.(key);
  };

  const handleOpenChange = (key: string, open: boolean) => {
    if (accordion) {
      if (open) {
        setOpenKeys([key]);
      } else {
        setOpenKeys(openKeys.filter(k => k !== key));
      }
    } else {
      if (open) {
        setOpenKeys([...openKeys, key]);
      } else {
        setOpenKeys(openKeys.filter(k => k !== key));
      }
    }
  };

  const renderItems = (menuItems: MenuItem[]): React.ReactNode => {
    return menuItems.map(item => {
      if (item.type === 'group') {
        return (
          <li key={item.key} className="ant-menu-item-group">
            <div className="ant-menu-item-group-title">{item.label}</div>
            <ul className="ant-menu-item-group-list">
              {item.children && renderItems(item.children)}
            </ul>
          </li>
        );
      }
      if (item.children) {
        return (
          // 👇 增加 itemKey={item.key}
          <SubMenu key={item.key} itemKey={item.key} title={item.label} icon={item.icon} disabled={item.disabled}>
            {renderItems(item.children)}
          </SubMenu>
        );
      }
      return (
        // 👇 增加 itemKey={item.key}
        <Item key={item.key} itemKey={item.key} icon={item.icon} disabled={item.disabled}>
          {item.label}
        </Item>
      );
    });
  };

  const renderedChildren = items ? renderItems(items) : children;

  
  const cls = classNames(
    'ant-menu',
    'ant-menu-root',
    [`ant-menu-${mode}`],
    [`ant-menu-${theme}`],
    className
  );
  return <MenuContext.Provider value={{
    mode,
    inlineIndent,
    level: 1,
    selectedKeys: currentSelectedKeys,
    onSelect: handleSelect,
    openKeys,
    onOpenChange: handleOpenChange
  }}>
    <ul className={cls} style={style} {...rest}>{renderedChildren}</ul>
  </MenuContext.Provider>
}
export default Menu;