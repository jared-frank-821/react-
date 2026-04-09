import type { Meta, StoryObj } from '@storybook/react-vite';

import Progress from './index';
import { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const meta = {
  title: 'Example/Progress',
  component: Progress,
  
  tags: ['autodocs'],

} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
 render:()=>{
  return(
    <>
    <Progress percent={30} />
    <br />
    <Progress percent={89} strokeColor='purple' />
    </>
  )
 }
};
export const Circle: Story = {
  render:()=>{
   return(
     <>
     <Progress percent={30}  type='circle'/>
    
     </>
   )
  }
 };
 export const DynamicCircle: Story = {
  render:()=>{
    const [changePercent,setChangePercent]=useState(0);
    const increase=()=>{
      setChangePercent(changePercent+10);
    };
    const decrease=()=>{
      setChangePercent(changePercent-10);
    };
   return(
     <>
     <Progress percent={changePercent}  type='circle'/>
      <MinusOutlined  onClick={decrease} />
      <PlusOutlined  onClick={increase} />
    
     </>
   )
  }
 };