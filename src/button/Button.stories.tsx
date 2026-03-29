import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './index';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Button',
  },
};

export const Basic: Story = {
  args: {
    style: {
      margin: '10px',
    },
    children: 'Button',
  },
  render: () => (
    <>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </>
  ),
};

export const Secondary: Story = {
  args: {
    children: 'Button',
  },
};
