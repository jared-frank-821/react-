import React, { useState,useRef } from 'react';
import classNames from 'classnames';
import './index.scss';
import type { CSSProperties } from 'react';
export interface radioProps extends React.HTMLAttributes<HTMLElement>{
  className?:string;
  checked?:boolean;
  defaultChecked?:boolean;
  children:React.ReactNode;
  backgroundColor?:string;
  style?:CSSProperties;
  onChange?:()=>void;
 
}
const Radio =(props:radioProps)=>{
  const {className,checked,children,style} =props;
  const [checkedState ,setChecked]=useState(checked)
  const inputEl=useRef<HTMLInputElement>(null)
  const cls=classNames({
    'ant-radio':true,
    [`ant-radio-checked`]: checkedState,  // 这个checkedstate是我们用usestate定义的，不是props的checked
    [className as string]:className
  })
  const handleClick=(e)=>{
    setChecked(!checkedState)
    if(typeof onChange==='function'){
      e.target=inputEl.current
      onChange(e)
    }
  }  
  return (
    <label className={cls} style={style} onClick={handleClick}>
      <span className="ant-radio ant-wave-target">
        <input className="ant-radio-input" type="radio" ref={inputEl} />
      </span>
      <span className="ant-radio-label">{children}</span>
    </label>
  )
}
export default Radio;