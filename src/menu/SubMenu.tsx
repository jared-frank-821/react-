import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
import MenuContext from './MenuContext';

export interface SubMenuProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  className?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: CSSProperties;
  icon?: React.ReactNode;
  itemKey?: string; // 👈 改为 itemKey，替代 React 保留的 key 属性
  disabled?: boolean;
}

const SubMenu = (props: SubMenuProps) => {
  const {
    className,
    title,
    children,
    style,
    icon,
    disabled,
    itemKey, // 👈 改为 itemKey
    ...rest
  } = props;

  const ctx = useContext(MenuContext);
  const level = ctx.level;
  const menuKey = itemKey as string; // 👈 使用 itemKey
  const isOpen = ctx.openKeys?.includes(menuKey) ?? false;

  const isSelected = useMemo(() => {
    const result: boolean[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // 👈 改为获取 itemKey，而不是 React 的 key
        const childKey = (child.props as { itemKey?: string }).itemKey;
        if (childKey && ctx.selectedKeys.includes(childKey as string)) {
          result.push(true);
        }
      }
    });
    return result.length > 0;
  }, [children, ctx.selectedKeys]);

  const paddingLeft = ctx.inlineIndent * level;

  const subMenuClass = classNames(
    'ant-menu-submenu',
    {
      'ant-menu-submenu-disabled': disabled,
      'ant-menu-submenu-selected': isSelected,
      'ant-menu-submenu-open': isOpen
    },
    className
  );

  const iconEle = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'ant-menu-item-icon' })
    : null;

  const handleClick = () => {
    if (!disabled) {
      ctx.onOpenChange?.(menuKey, !isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <li className={subMenuClass} style={style} {...rest}>
      <div
        className="ant-menu-submenu-title"
        role="menuitem"
        tabIndex={disabled ? undefined : -1}
        style={{ paddingLeft }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {iconEle}
        <span className="ant-menu-title-content">{title}</span>
        <i className="ant-menu-submenu-arrow" aria-hidden="true" />
      </div>
      <MenuContext.Provider
        value={{
          ...ctx,
          level: level + 1,
        }}
      >
        <ul className={classNames('ant-menu ant-menu-sub ant-menu-inline', {
          'ant-menu-hidden': !isOpen
        })} role="menu">
          {children}
        </ul>
      </MenuContext.Provider>
    </li>
  );
};

export default SubMenu;
