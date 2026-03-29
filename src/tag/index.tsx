import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
  // import Icon from '../icon';
import { CloseOutlined } from '@ant-design/icons';
interface TagProps extends React.HTMLAttributes<HTMLElement> //这个属性props定义了外界可以传给Tag组件的参数
{
  className?:string;
  visible?:boolean;//是否显示标签
  onClick?:React.MouseEventHandler<HTMLElement>;
  color?:string;
  onClose?:()=>void;
 closeable?:boolean;//是否显示关闭按钮
}


  const Tag =(props:TagProps)=>{
  const {color='gray',children,onClick,onClose,closeable=false,visible:pvisible,...others}=props;  //visible重新命名为pvisible，避免与内部state的visible冲突
  const [visible,setVisible]=useState(pvisible===undefined?true:pvisible)//初始化内部状态：如果外部没传 visible，默认显示（true）；如果传了就用传入的值
  const customColor=color&&color.match(/^#/)//用正则检测 color 是否以 # 开头，判断是自定义十六进制色还是预设主题名
  const cls=classNames({
    'ant-tag':true,
    [`ant-tag-${color}`]: color&&!customColor,  // 使用模板字符串 只在使用预设颜色名时生效
    [`ant-tag-disabled`]: !visible,  // 使用模板字符串 如果标签被隐藏，添加 disabled 类
  })
  useEffect(()=>{
    if('visible' in props&&props.visible!==undefined)
    {
      setVisible(props.visible)
    }
  },[props.visible])
  const handleClick=()=>{//切换 visible 状态
    setVisible(!visible)
  }
  const style:React.CSSProperties={};
  if(customColor){
    style.backgroundColor=color;
  }
  if(!visible) return null;//不可见时直接不渲染任何 DOM，相当于销毁组件
  return (
    <span className={cls} {...others} style={style}  >
      {children}
      {closeable? <CloseOutlined  style={{verticalAlign:'text-top'}}  onClick={handleClick} />:null}
    </span>
  )
} 
export default Tag;