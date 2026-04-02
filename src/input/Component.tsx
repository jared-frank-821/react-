import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
export interface InputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {

  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  size?: 'large' | 'small' | 'medium';
  maxLength?: number;
  prefix?: React.ReactNode;
}

const sizeMap = {
  large: 'lg',
  small: 'sm',
  medium: undefined,
};

const Input = (props: InputProps) => {
  const { className, value: pvalue, defaultValue, placeholder, onChange, style, size = 'medium', disabled, prefix, ...rest } = props;

  const [value, setValue] = useState(pvalue || defaultValue || '');

  useEffect(() => {
    if ('value' in props) {
      setValue(pvalue || '');
    }
  }, [pvalue]);

  const cls = classNames({
    'ant-input': true,
    [`ant-input-${sizeMap[size]}`]: sizeMap[size],
    [`ant-input-disabled`]: disabled,
    [className as string]: className,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!('value' in props)) {
      setValue(e.target.value);
    }
    onChange?.(e);
  };

  const wrapperCls = classNames({
    'ant-input-affix-wrapper': true,
    'ant-input-affix-wrapper-lg': size === 'large',
    'ant-input-affix-wrapper-sm': size === 'small',
  });

  const input = (
    <input
      {...rest}
      className={cls}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      onChange={handleChange}
    />
  );

  if (props.maxLength||prefix) {
    return (
      <span className={wrapperCls}>
        {prefix && <span className="ant-input-prefix">{prefix}</span>}
        {input}
        {props.maxLength && <span className="ant-input-suffix">
          <span className="ant-input-show-count-suffix">{value.length} / {props.maxLength}</span>
        </span>}
      </span>
    );
  }

  return input;
};

export default Input;
