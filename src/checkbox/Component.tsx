import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
export interface checkboxChangeEventTarget {
  value:string;
  checked:boolean;
}
export interface checkboxChangeEvent {
  target:checkboxChangeEventTarget;
}

export interface checkboxProps extends Omit<React.HTMLAttributes<HTMLElement>,'onChange'>{
 prefixCls?:string;
 defaultChecked?:boolean;
 checked?:boolean;
 disabled?:boolean;
 value?:string;

 onChange?:(e:checkboxChangeEvent)=>void;
 className?:string;
 children?:React.ReactNode;
 style?:object;
}
const Checkbox=(props:checkboxProps)=>{
  const {prefixCls='ant-'}=props;
const [checked,setChecked]=useState(props.defaultChecked || false)
const inputEl=useRef(null)

useEffect(()=>{
  if('checked'in props){
    setChecked(props.checked||false)
  }
},[props.checked])
const handleClick=()=>{
  if(props.disabled) return;

  const state=!checked;
  if(!('checked'in props)){
    setChecked(state);
  }
  if(typeof props.onChange==='function'){
    props.onChange({
      target:{
        value:props.value ?? '',
        checked:state,
      }
    });

  }
}

 
  const cls=classNames({
    [`${prefixCls}checkbox`]:true,
    [`${prefixCls}checkbox-checked`]:checked,
    [`${prefixCls}checkbox-disabled`]:props.disabled,
    [props.className as string]:props.className
  })

  const wrapperCls=classNames({
    [`${prefixCls}checkbox-wrapper`]:true,
    [`${prefixCls}checkbox-wrapper-disabled`]:props.disabled,
  })

  return (
    <label className={wrapperCls} >
    <span className={cls}>
      <input
        type="checkbox"
        ref={inputEl}
        checked={checked}
        onChange={handleClick}
        disabled={props.disabled}
        value={props.value}
      />
      <span className={`${prefixCls}checkbox-inner`} />
    </span>
    <span>{props.children}</span>
    </label>
  );
};
export default Checkbox;