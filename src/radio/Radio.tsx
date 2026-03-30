import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties, ChangeEvent } from 'react';

export interface RadioProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  backgroundColor?: string;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = (props: RadioProps) => {
  const { className, checked, defaultChecked, children, style, onChange, disabled,value } = props;
  
  // 区分受控和非受控组件
  const [checkedState, setChecked] = useState(defaultChecked ?? false);
  
  // 如果是受控组件，外部 checked 变化时同步更新
  useEffect(() => {
    if (checked !== undefined) {
      setChecked(checked);
    }
  }, [checked]);
  
  const inputEl = useRef<HTMLInputElement>(null);
  
  const cls = classNames({
    'ant-radio': true,
    'ant-radio-checked': checked ?? checkedState,
    'ant-radio-disabled': disabled,
    [className as string]: className
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    // 非受控组件：内部更新状态
    if (checked === undefined) {
      setChecked(e.target.checked);
    }
    // 受控和非受控都调用 onChange
    onChange?.(e);
  };

  return (
    <label className={cls} style={style}>
      <span className="ant-radio ant-wave-target">
        <input
          className="ant-radio-input"
          type="radio"
          ref={inputEl}
          checked={checked ?? checkedState}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          value={value}
        />
        <span className="ant-radio-inner" />
      </span>
      <span className="ant-radio-label">{children}</span>
    </label>
  );
};

export default Radio;