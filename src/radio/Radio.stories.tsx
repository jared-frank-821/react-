import type { Meta, StoryObj } from '@storybook/react-vite';

import Radio from './index';

const meta = {
  title: 'Example/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    
    children: 'Radio',
  },
};

export const Basic: Story = {
  args: {
    style: {
      margin: '10px',
    },
    children: 'Radio',
  }
};

export const unchecked: Story = {
  args: {
    checked: false,
    children: 'Unchecked Radio',
  },
  render: () => (  <>
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
