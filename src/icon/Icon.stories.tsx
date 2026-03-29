import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon from './index';

const meta = {
  title: 'Example/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['fixed', 'copy'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fixed: Story = {
  args: {
    type: 'fixed',
    size: 16,
    onClick: () => {},
  },
};

export const Copy: Story = {
  args: {
    type: 'copy',
    size: 16,
    onClick: () => {},
  },
};