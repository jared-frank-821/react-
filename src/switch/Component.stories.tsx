import type { Meta, StoryObj } from '@storybook/react-vite';

import Switch from './index';
import Button from '../button/index';
import { useState } from 'react';

const meta = {
  title: 'Example/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'small',
    defaultChecked: false,
    disabled: false,
    onChange: (checked: boolean) => {
      console.log(`switch to ${checked}`);
    },
  },
};

export const Basic: Story = {
  render: () => (
    <Switch defaultChecked />
  ),
};


export const Controlled: Story = {
  render: () => {
    const onChange = (checked: boolean) => {
      console.log(`switch to ${checked}`);
    };
    return (
      <>
        <Switch defaultChecked onChange={onChange} />
      </>
    );
  },
};

export const Disabled: Story = {
  render: () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const toggleDisabled=()=>{
    setIsDisabled(!isDisabled);
    console.log(`switch is disabled: ${isDisabled}`);
  };
  return (
    <>
      <Switch disabled={isDisabled} defaultChecked />
      <Button  onClick={toggleDisabled}>Toggle disabled</Button>
    </>
  );
},
};

export const Loading: Story = {
  render: () => {
    return (
      <>
        <Switch loading defaultChecked={true} />
        <Switch  defaultChecked={false} />
      </>
    );
  },
};