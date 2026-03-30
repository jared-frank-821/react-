import type { Meta, StoryObj } from '@storybook/react-vite';

import Radio from './index';
const RadioGroup=Radio.Group
const meta = {
  title: 'Example/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args:{
    value:'1',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>
  ),
  
};

export const Basic: Story = {
  args: {
    style: {
      margin: '10px',
    },
    children: 'RadioGroup',
  }
};

export const unchecked: Story = {
  args: {
    children: 'Unchecked RadioGroup ',
  },
  render: () => (
    <>
      <Radio checked={false}>Unchecked Radio</Radio>
    </>
  )
};

export const disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Radio',
  },
  render: () => (
    <>
    <Radio disabled>Disabled Radio</Radio>
    </>
  )
};
