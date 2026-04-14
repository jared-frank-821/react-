import React, { cloneElement, type ReactElement, useCallback, useRef, useState } from "react";
import Overlay, { type overlayProps } from "./Overlay";
import type { PlacementType } from "./placement";

export interface popupProps extends Omit<overlayProps, 'children'> {
  trigger: ReactElement;
  children: ReactElement | string;
  placement?: PlacementType;
  beforePosition?:Function;
  triggerType?:'hover'|'click';
}

const Popup = (props: popupProps) => {
  const { trigger, children, placement = 'bottomLeft', ...others } = props;
  const { triggerType = 'click' } = props;
  const triggerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  
  // 👇 明确指定类型，避免 ts 报错
  const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);
  const mouseLeaveTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerRefCallback = useCallback(node => {
    triggerRef.current = node;
  }, []);

  const handleMouseEnter = () => {
    // 1. 如果正在准备隐藏，立刻取消隐藏
    if (mouseLeaveTimer.current) {
      clearTimeout(mouseLeaveTimer.current);
      mouseLeaveTimer.current = null;
    }
    // 2. 如果当前不可见，且没有正在准备显示，则开始显示倒计时
    if (!mouseEnterTimer.current && !visible) {
      mouseEnterTimer.current = setTimeout(() => {
        setVisible(true);
        mouseEnterTimer.current = null; // 👇 修复：执行完后一定要置空
      }, 150); // 👇 建议 150ms 容错率更高
    }
  };

  const handleMouseLeave = () => {
    // 1. 如果正在准备显示，立刻取消显示
    if (mouseEnterTimer.current) {
      clearTimeout(mouseEnterTimer.current);
      mouseEnterTimer.current = null;
    }
    // 2. 如果当前可见，且没有正在准备隐藏，则开始隐藏倒计时
    if (!mouseLeaveTimer.current && visible) {
      mouseLeaveTimer.current = setTimeout(() => {
        setVisible(false);
        mouseLeaveTimer.current = null; // 👇 修复：执行完后一定要置空
      }, 150); 
    }
  };

  const triggerProps: any = {
    ref: triggerRefCallback,
    onClick: () => {
      setVisible(true);
    }
  };

  if (triggerType === 'hover') {
    triggerProps.onMouseEnter = handleMouseEnter;
    triggerProps.onMouseLeave = handleMouseLeave;
  } else {
    triggerProps.onClick = () => setVisible(true);
  }

  const triggerEle = typeof trigger === 'string' ? <span>{trigger}</span> : trigger;
  const triggerNode = cloneElement(triggerEle, triggerProps);

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  // 👇 关键修改：处理传入 Overlay 的 children
  let childNode = typeof children === 'string' ? <div style={{border:'1px solid #999'}}>{children}</div> : children;
  
  // 👇 如果是 hover 模式，把鼠标移入/移出事件也克隆给弹出的菜单节点
  if (triggerType === 'hover') {
    childNode = cloneElement(childNode as ReactElement, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    });
  }

  return (
    <>
      {triggerNode}
      <Overlay {...others} placement={placement} target={() => triggerRef.current} visible={visible} onVisibleChange={handleVisibleChange}>
        {childNode}
      </Overlay>
    </>
  );
};

export default Popup;