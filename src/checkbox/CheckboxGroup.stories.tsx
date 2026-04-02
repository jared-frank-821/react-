import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckboxGroup from './CheckboxGroup';
import Checkbox from './Checkbox';

const meta = {
  title: 'Example/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: ['A'],
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="A">A</Checkbox>
      <Checkbox value="B">B</Checkbox>
      <Checkbox value="C">C</Checkbox>
    </CheckboxGroup>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: ['A'],
    disabled: true,
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="A">A</Checkbox>
      <Checkbox value="B">B</Checkbox>
      <Checkbox value="C">C</Checkbox>
    </CheckboxGroup>
  ),
};
