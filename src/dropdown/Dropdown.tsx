import React from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties, ReactElement } from 'react';
import Popup from '../overlay/Popup';
import type { PlacementType } from '../overlay/placement';

export interface dropdownProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
  overlay: ReactElement; // 这里虽然要求必填，但在运行时可能会漏传
  placement?: PlacementType;
}

const Dropdown = (props: dropdownProps) => {
  const { placement='bottomLeft',className, children, style, overlay, ...others } = props;
  
  const cls = classNames({
    'ant-dropdown': true,
    [className as string]: className
  });

  // 👇 增加安全校验：确保 overlay 是有效的 React 元素后再 clone
  let overlayContent = overlay;
  if (React.isValidElement(overlay)) {
    overlayContent = React.cloneElement(overlay as ReactElement<any>, {
      prefix: 'ant-dropdown-'
    });
  }

  return (
    <Popup 
      {...others}
      className={cls}
      style={style}
      placement={placement}
      trigger={children as ReactElement} // Popup 的 trigger 需要 ReactElement
      triggerType='hover'
    >
      {overlayContent}
    </Popup>
  );
}

export default Dropdown;