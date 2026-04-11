import type { Meta, StoryObj } from '@storybook/react-vite';

import Overlay from './index';
import { useState } from 'react';
import Button from '../button';

const meta = {
  title: 'Example/Overlay',
  component: Overlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // 👇 使用 argTypes 显式包含所有属性
  argTypes: {
    className: { description: 'CSS 类名' },
    style: { description: '内联样式' },
    onClick: { description: '点击事件' },
  },
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    hasMask: false,
    visible: true,
    children: <div>Content</div>,
  },
};


export const underControl: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show</Button>
        <Overlay
          visible={visible}
          onVisibleChange={(v) => setVisible(v)}
        >
          <div style={{
            padding: 20,
            background: 'white',
            border: '1px solid #000',
          }}>
            Controlled Overlay
          </div>
        </Overlay>
      </>
    );
  },
};
