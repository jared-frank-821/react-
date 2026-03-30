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
    type: 'primary',
    children: 'Radio',
  },
};

export const Basic: Story = {
  args: {
    style: {
      margin: '10px',
    },
    children: 'Radio',
  },
  render: () => (
    <>
      <Radio type="primary">Primary Radio</Radio>

    </>
  ),
};

export const Secondary: Story = {
  args: {
    children: 'Radio',
  },
};
