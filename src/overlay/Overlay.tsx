import React from 'react';
import ReactDom from 'react-dom';
import './index.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { useListener } from './utils';
import getPlacement, { type PointType, type PlacementType } from './placment';


export interface overlayProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactElement ;
  hasMask?: boolean;
  style?: CSSProperties;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  target?: HTMLElement | (() => HTMLElement);
  points?: PointType;
  placement?:PlacementType
}

const Overlay = (props: overlayProps) => {
  const { children, visible: pvisible, onVisibleChange, target, points, placement } = props;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
  const overlayRef = useRef<HTMLElement>(null);

  // 计算位置并更新样式
  const updatePosition = useCallback(() => {
    if (!target || !overlayRef.current) return; 
    const targetElement = typeof target === 'function' ? target() : target;
    if (!targetElement) return;
    
    // 2. 👇 必须把 placement 传给定位函数！
    const style = getPlacement({ 
      target: targetElement, 
      overlay: overlayRef.current, 
      points: points,
      placement: placement // <--- 重点加上这个！
    });
    setPositionStyle(style as CSSProperties);
  }, [target, points, placement]); // 3. 依赖项也加上 placement

  // ref 回调：挂载时保存节点，卸载时置空
  const overlayRefCallback = useCallback((node: HTMLElement | null) => {
    overlayRef.current = node;
    if(node&&target){
      const targetElement=typeof target==='function'? target():target
      const positionStyle=getPlacement({target:targetElement,overlay:node,points:points})
      setPositionStyle(positionStyle as CSSProperties)
    }
  }, []);

  // 点击事件回调
  const handleMouseDown = useCallback((e: MouseEvent) => {
    const clickNode = e.target;
    if (overlayRef.current && overlayRef.current.contains(clickNode as Node)) {
      return;
    }
    onVisibleChange?.(false);
  }, [onVisibleChange]);

  // ESC 键回调
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onVisibleChange?.(false);
    }
  }, [onVisibleChange]);

  // 组件挂载后同步 visible 状态
  useEffect(() => {
    setMounted(true);
    setVisible(pvisible === undefined ? false : pvisible);
  }, []);

  // 监听外部 visible 变化
  useEffect(() => {
    if (pvisible !== undefined) {
      setVisible(pvisible);
    }
  }, [pvisible]);

  // 当 visible 变为 true 时，重新计算位置
  useEffect(() => {
    if (visible) {
      // 延迟一下，确保 DOM 已渲染
      const timer = requestAnimationFrame(updatePosition);
      return () => cancelAnimationFrame(timer);
    }
  }, [visible, updatePosition]);

  // 👇 使用 useListener 简化事件监听
  useListener(window, 'mousedown', handleMouseDown, visible);
  useListener(window, 'keydown', handleKeyDown as (e: Event) => void, visible);

  // 👇 条件返回放在所有 Hooks 之后
  if (!mounted) return null;
  if (!visible) return null;
  if (!children) return null;

  const child: ReactElement = React.Children.only(children);
  const childProps = child.props as { style?: CSSProperties };
  const newChildren = React.cloneElement(child, {
    ref: overlayRefCallback,
    style: { ...positionStyle, ...childProps.style },
  } as React.RefAttributes<HTMLElement>);

  const content = ReactDom.createPortal(newChildren, document.body);
  return content;
};

export default Overlay;