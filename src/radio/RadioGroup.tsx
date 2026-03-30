import React, { useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties, ChangeEvent } from 'react';
import Radio from './Radio';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLElement> {
  value?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { className,  children, style, onChange, disabled } = props;
  
  // 区分受控和非受控组件
 const [value,setValue]=useState(props.defaultValue || props.value)
  
  
  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    const newValue=e.target.value;
    setValue(newValue);
    onChange?.(e);
  }


  const cls = classNames({
    'ant-radio-group': true,
    'ant-radio-disabled': disabled,
    [className as string]: className
  });

 const newChildren=React.Children.map(children,(child:any)=>{
  if(child.type!==Radio){
    return null
  }
  return React.cloneElement(child,{
    checked:child.props.value===value,
    onChange:handleChange,
    disabled:disabled
  });
 })

  return (
    <div className={cls} style={style}>
      {newChildren}
    </div>
  );
};

export default RadioGroup;