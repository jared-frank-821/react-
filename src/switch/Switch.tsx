import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onChange' | 'type'> {
  className?: string;
  style?: CSSProperties;
  size?: 'small' | 'medium';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  loading?: boolean;
}

const Switch = (props: SwitchProps) => {
  const {
    className,
    style,
    size = 'medium',
    checked,
    defaultChecked = false,
    disabled = false,
    onChange,
    onClick,
    loading = false,
    ...restProps
  } = props;

  const [innerChecked, setInnerChecked] = useState(defaultChecked);

  const isChecked = 'checked' in props ? checked : innerChecked;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      return;
    }

    const nextChecked = !isChecked;

    if (!('checked' in props)) {
      setInnerChecked(nextChecked);
    }

    if (onChange) {
      onChange(nextChecked);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const cls = classNames(
    'ant-switch',
    {
      'ant-switch-checked': isChecked,
      'ant-switch-disabled': disabled || loading,
      [`ant-switch-${size}`]: size,
      'ant-switch-loading': loading,
    },
    className,
  );

  return (
    <button
      {...restProps}
      type="button"
      className={cls}
      style={style}
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled || loading}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading && <span className="ant-switch-loading-icon" />}
      <span className="ant-switch-handle" />
      <span className="ant-switch-inner" />
    </button>
  );
};

export default Switch;
