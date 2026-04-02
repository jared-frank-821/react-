import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from './index';

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    checked: false,
    children: 'Checkbox',
  },
};

export const Basic: Story = {
  args: {
    children: 'Checkbox',
  },
};

export const Disabled: Story = {
  args: {},
  render: () => {
    return (
      <>
        <Checkbox defaultChecked={false} disabled />
        <br />
        <Checkbox defaultChecked={true} disabled />
      </>
    );
  },
};
