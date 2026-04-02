import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import checkboxContext from './content';
export interface checkboxChangeEventTarget {
  value:string;
  checked:boolean;
}
export interface checkboxChangeEvent {
  target:checkboxChangeEventTarget;
}

export interface checkboxGroupProps extends Omit<React.HTMLAttributes<HTMLElement>,'onChange'>{

 disabled?:boolean;
 defaultValue?:Array<string>;
 value?:Array<string>;

 onChange?:(checkedValues:Array<string>)=>void;
 className?:string;
 children?:React.ReactNode;
 style?:object;
}
const CheckboxGroup=(props:checkboxGroupProps)=>{
  const {disabled,style,className}=props
  const [value,setValue]=useState(props.defaultValue || props.value || [])

  useEffect(()=>{
    if('value'in props){
      setValue(props.value || []);
    }
  },[props.value])

  const handleChange=(e:checkboxChangeEvent)=>{
    const targetValue=e.target.value;
    const checked=e.target.checked;
    let newValue:Array<string>;

    if(checked){
      newValue=value.concat(targetValue);
    }else{
      newValue=value.filter(v=>v!==targetValue);
    }
    setValue(newValue);
    if(typeof props.onChange==='function'){
      props.onChange(newValue);
    }
  };

  const children=React.Children.map(props.children,(child:any)=>{
    return React.cloneElement(child,{
      checked:value.includes(child.props.value)
    })
  })

  const cls=classNames({
    'ant-checkbox-group':true,
    [className as string]:className,
  })

  return (
    <div className={cls} style={style}>
      <checkboxContext.Provider value={{onChange:handleChange,disabled:!!disabled,value}}>
        {children}
      </checkboxContext.Provider>
    </div>
  );
};
export default CheckboxGroup;
