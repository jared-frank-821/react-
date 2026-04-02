import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from './index';

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'basic usage',
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: 'abcd',
    placeholder: 'with defaultValue',
  },
};

export const Size = () => {
  return (
    <>
      <Input size="small" placeholder="small size" /><br />
      <Input size="medium" placeholder="medium size" /><br />
      <Input size="large" placeholder="large size" />
    </>
  );
};
import { UserOutlined } from '@ant-design/icons';
export const Prefix: Story = {
render:()=>{
  return (
    <>
    <Input size='large' placeholder='large size'prefix={<UserOutlined />} />
    <br />
    <Input size='medium' placeholder='medium size'prefix={<UserOutlined />} />
    <br />
    <Input size='small' placeholder='small size'prefix={<UserOutlined />} />
    </>
  )
}
  
};


export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'disabled input',
  },
};

export const Control = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="input with value" />
      <button onClick={() => setValue('')}>Clear</button>
    </>
  );
};

export const Maxlength: Story={
  args:{
    maxLength: 10,
    placeholder: 'maxlength 10',
  },
 
}

const TextArea = Input.TextArea;

export const TextArea1=()=>{
  render:()=>{
   return(
     <>
     <Input.TextArea showcount={true} maxLength={10} placeholder='textarea with showcount' />
     </>
   )
  }
  
 }
export const TextAreaAutoSize = () => (
  <>
    <TextArea placeholder="Autosize height based on content lines" autoSize />
    <div style={{ margin: '24px 0' }} />
    <TextArea
      placeholder="Autosize height with minimum and maximum number of lines"
      autoSize={{ minRows: 2, maxRows: 6 }}
    />
    <div style={{ margin: '24px 0' }} />
    <TextArea
      placeholder="Controlled autosize"
      autoSize={{ minRows: 3, maxRows: 5 }}
    />
  </>
);