import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { ChangeEvent, CSSProperties, TextareaHTMLAttributes } from 'react';

export type TextAreaAutoSize = boolean | { minRows?: number; maxRows?: number };

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showcount?: boolean;
  autoSize?: TextAreaAutoSize;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  style?: CSSProperties;
  maxLength?: number;
}

const TextArea = (props: TextAreaProps) => {
  const {
    className,
    value: pvalue,
    defaultValue,
    placeholder,
    onChange,
    style,
    disabled,
    showcount,
    maxLength,
    autoSize,
    ...rest
  } = props;

  const [value, setValue] = useState(pvalue || defaultValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  

  useEffect(() => {
    if ('value' in props) {
      setValue(pvalue || '');
    }
  }, [pvalue]);

  useLayoutEffect(() => {
    if (!autoSize || !textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 0;
    const paddingHeight = Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom);
    const borderHeight = Number.parseFloat(computedStyle.borderTopWidth) + Number.parseFloat(computedStyle.borderBottomWidth);

    textarea.style.height = 'auto';

    let nextHeight = textarea.scrollHeight;

    if (typeof autoSize === 'object' && lineHeight > 0) {
      if (autoSize.minRows) {
        const minHeight = autoSize.minRows * lineHeight + paddingHeight + borderHeight;
        nextHeight = Math.max(nextHeight, minHeight);
      }
      if (autoSize.maxRows) {
        const maxHeight = autoSize.maxRows * lineHeight + paddingHeight + borderHeight;
        nextHeight = Math.min(nextHeight, maxHeight);
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    } else {
      textarea.style.overflowY = 'hidden';
    }

    textarea.style.height = `${nextHeight}px`;
  }, [autoSize, value]);

  const cls = classNames({
    'ant-input': true,
    [`ant-input-disabled`]: disabled,
    [className as string]: className,
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(disabled) return;
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
      ref={textareaRef}
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
          ref={textareaRef}
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
