import React, { cloneElement, type ReactElement, useCallback, useRef, useState } from "react";
import Overlay, { type overlayProps } from "./Overlay";
import type { PlacementType } from "./placment";

// 👇 使用 Omit 剔除原本的 children 约束，重新定义为支持 string
export interface popupProps extends Omit<overlayProps, 'children'> {
  trigger: ReactElement;
  children: ReactElement | string;
  placement?: PlacementType;
  beforePosition?:Function
  triggerType?:'hover'|'click'
}
const Popup = (props: popupProps) => {
  const { trigger, children, ...others } = props;
  const {triggerType='click'}=props
  const triggerRef=useRef(null)
  const [visible,setVisible]=useState(false)

  const triggerRefCallback=useCallback(node=>{
    triggerRef.current=node
  },[])
  const triggerProps={
    ref:triggerRefCallback,
    onClick:()=>{
      setVisible (true)
    }
  }

  if(triggerType==='hover'){
    triggerProps.onMouseEnter=()=>setVisible(true)
    triggerProps.onMouseLeave=()=>setVisible(false)
  }else{
    triggerProps.onClick=()=>setVisible(true)
  }
  const triggerEle=typeof trigger ==='string'?<span>{trigger}</span>:trigger
  const triggerNode=cloneElement(triggerEle,triggerProps)
  const handleVisibleChange=(visible:boolean)=>{
    setVisible(visible)
  }
  return (
    <>
      {triggerNode}
     <Overlay {...others} target={()=>triggerRef.current} visible={visible} onVisibleChange={handleVisibleChange}>
      {typeof children==='string'?<div style={{border:'1px solid #999'}}>{children}</div>:children}
     </Overlay>
    </>
  );
};

export default Popup;