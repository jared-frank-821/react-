import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import Affix from './index';
import Button from '../button';

const meta = {
  title: 'Example/Affix',
  component: Affix,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Affix>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const [top, setTop] = useState(100);
    const [bottom, setBottom] = useState(10);
    return (
      <>
        <Affix offsetTop={top}>
          <Button type="primary" onClick={() => setTop((t) => t + 10)}>
            Affix top
          </Button>
        </Affix>
        <br />
        <br />
        <Affix offsetBottom={bottom}>
          <Button type="primary" onClick={() => setBottom((b) => b + 10)}>
            Affix bottom
          </Button>
        </Affix>
      </>
    );
  },
};

export const Basic: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: 300,
          height: 200,
          overflow: 'auto',
          border: '1px solid #1677ff',
          resize: 'both',
        }}
      >
        <div style={{ height: 800 }}>
          <Affix target={() => containerRef.current} offsetTop={0}>
            <Button type="primary">Fixed at the top</Button>
          </Affix>
        </div>
      </div>
    );
  },
};
