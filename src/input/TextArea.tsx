import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';

export interface TextAreaProps extends Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showcount?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: CSSProperties;
  maxLength?: number;
}

const TextArea = (props: TextAreaProps) => {
  const { className, value: pvalue, defaultValue, placeholder, onChange, style, disabled, showcount, maxLength, ...rest } = props;

  const [value, setValue] = useState(pvalue || defaultValue || '');

  useEffect(() => {
    if ('value' in props) {
      setValue(pvalue || '');
    }
  }, [pvalue]);

  const cls = classNames({
    'ant-input': true,
    [`ant-input-disabled`]: disabled,
    [className as string]: className,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in props)) {
      setValue(e.target.value);
    }
    onChange?.(e);
  };

  const wrapperCls = classNames({
    'ant-input-affix-wrapper': true,
    'ant-input-textarea-show-count': showcount,
  });

  const textarea = (
    <textarea
      {...rest}
      className={cls}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      onChange={handleChange}
    />
  );

  if (showcount) {
    return (
      <span className={wrapperCls} data-count={`${value.length}/${maxLength}`}>
        <textarea
          {...rest}
          className={cls}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          style={style}
          maxLength={maxLength}
          onChange={handleChange}
        />
      </span>
    );
  }

  return textarea;
};

export default TextArea;
