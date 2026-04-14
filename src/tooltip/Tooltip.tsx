// 1. 记得引入 useState
import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties, ReactNode } from 'react';
import Popup from '../overlay/Popup';
import { type PlacementType } from '../overlay/placement';

export interface tooltipProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  type?: 'primary' | 'normal' | 'dashed' | 'text' | 'link';
  children: ReactElement; 
  style?: CSSProperties;
  size?: 'large' | 'small' | 'medium';
  title?: ReactNode;
  placement?: PlacementType;
  // 👇 如果您打算从 stories 中传入此控制变量，这里需要加上定义
  arrowPointAtCenter?: boolean; 
}

// Tooltip.tsx 关键修改
const Tooltip = (props: tooltipProps) => {
  const { className, children, title, placement, arrowPointAtCenter, ...others } = props;

  // 默认使用传入的 placement
  const [realPlacement, setRealPlacement] = useState(placement);

  // 修复 1: 修正 beforePosition 逻辑
  const handeleBeforePosition = (position: any, { target, placement: calculatedPlacement }: any) => {
    // 只有当实际位置发生变化时才更新状态，避免无效渲染
    if (calculatedPlacement !== realPlacement) {
        setRealPlacement(calculatedPlacement);
    }

    if (!arrowPointAtCenter) {
      return position;
    }

    // 修复 2: 如果要居中，应该是【目标的左偏移 + 目标宽度的一半 - 气泡宽度的一半】
    // 这里建议先保持默认 position，除非你确实要特殊偏移
    return position; 
  };

  // 修复 3: 使用 realPlacement 而不是 placement
  const overlayContent = (
    <div 
      className={classNames(
        'ant-tooltip', 
        realPlacement && `ant-tooltip-placement-${realPlacement}`, // 必须用实际位置
        className
      )}
    >
      <div className='ant-tooltip-content'>
        {/* 修复 4: 增加箭头包裹层 */}
        <div className="ant-tooltip-arrow">
          <span className="ant-tooltip-arrow-content" />
        </div>
        <div className='ant-tooltip-inner'>{title}</div>
      </div>
    </div>
  );

  return (
    <Popup
      {...others}
      trigger={children}
      placement={placement}
      triggerType="hover"
      beforePosition={handeleBeforePosition}
    >
      {overlayContent}
    </Popup>
  );
};
export default Tooltip;