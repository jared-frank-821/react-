import React from 'react';
import ReactDom from 'react-dom';
import './index.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { useListener } from './utils';

export interface overlayProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactElement;
  hasMask?: boolean;
  style?: CSSProperties;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const Overlay = (props: overlayProps) => {
  const { children, visible: pvisible, onVisibleChange } = props;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLElement>(null);

  // 👇 所有 Hooks 必须放在条件返回之前

  // ref 回调：挂载时保存节点，卸载时置空
  const overlayRefCallback = useCallback((node: HTMLElement | null) => {
    overlayRef.current = node;
  }, []);

  // 点击事件回调（用 ref 存储，保证 useListener 依赖稳定）
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

  // 👇 使用 useListener 简化事件监听
  // enabled 为 true 时添加监听，为 false 时移除监听
  useListener(window, 'mousedown', handleMouseDown, visible);
  useListener(window, 'keydown', handleKeyDown as (e: Event) => void, visible);

  // 👇 条件返回放在所有 Hooks 之后
  if (!mounted) return null;
  if (!visible) return null;
  if (!children) return null;

  const child: ReactElement = React.Children.only(children);
  const newChildren = React.cloneElement(child, {
    ref: overlayRefCallback,
  } as React.RefAttributes<HTMLElement>);

  const content = ReactDom.createPortal(newChildren, document.body);
  return content;
};

export default Overlay;
