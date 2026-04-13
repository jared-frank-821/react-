import type { Meta, StoryObj } from '@storybook/react-vite';

import Overlay from './index';
import { useRef, useState } from 'react';
import Button from '../button';
import Popup from './Popup';

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

// export const Primary: Story = {
//   args: {
//     hasMask: false,
//     visible: true,
//     children: <div>Content</div>,
//   },
// };


export const underControl: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    return (
      <>
        <div ref={buttonRef} onClick={() => setVisible(true)}>Show</div>
        <Overlay
          visible={visible}
          onVisibleChange={(v) => setVisible(v)}
          target={() => buttonRef.current as HTMLElement}
        >
          <div style={{
            width:300,
            height:300,
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


export const AllPoints: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const pointList: Array<'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br'> = [
      'tl', 'tc', 'tr',
      'cl', 'cc', 'cr',
      'bl', 'bc', 'br'
    ];

    return (
      <div style={{ padding: 100 }}>
        <div
          ref={buttonRef}
          onClick={() => setVisible(true)}
          style={{
            width: 200,
            height: 200,
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#f8f9fa'
          }}
        >
          Click Me
        </div>

        {pointList.map((point2) => (
          pointList.map((point) => (
            <Overlay
              key={`${point}-${point2}`}
              visible={visible}
              onVisibleChange={(v) => setVisible(v)}
              target={() => buttonRef.current as HTMLElement}
              points={[point, point2]}
            >
              <div style={{
                border: '1px solid black',
                background: 'white',
                lineHeight: '1.2',
                padding: '2px'
              }}>
                {point}{point2}
              </div>
            </Overlay>
          ))
        ))}
      </div>
    );
  },
};

// 各个方向的单独展示
// 在目标元素周围同时展示所有 9 个方向的定位效果
export const Placement = () => {
  const topLeft = <Button>topLeft</Button>;
  const top = <Button>top</Button>;
  const topRight = <Button>topRight</Button>;
  const leftTop = <Button>leftTop</Button>;
  const left = <Button>left</Button>;
  const leftBottom = <Button>leftBottom</Button>;
  const rightTop = <Button>rightTop</Button>;
  const right = <Button>right</Button>;
  const rightBottom = <Button>rightBottom</Button>;
  const bottomLeft = <Button>bottomLeft</Button>;
  const bottom = <Button>bottom</Button>;
  const bottomRight = <Button>bottomRight</Button>;

  return <div style={{paddingLeft: 200}}>
    <div style={{ marginLeft: 75 }}>
      <Popup trigger={topLeft} placement='topLeft'>topLeft</Popup>
      <Popup trigger={top} placement='top'>top</Popup>
      <Popup trigger={topRight} placement='topRight'>topRight</Popup>
    </div>
    <div style={{ width: 75, float: 'left' }}>
    <Popup trigger={leftTop} placement='leftTop'>leftTop</Popup>
    <Popup trigger={left} placement='left'>left</Popup>
    <Popup trigger={leftBottom} placement='leftBottom'>leftBottom</Popup>
    </div>
    <div style={{ width: 75, marginLeft: 270 }}>
    <Popup trigger={rightTop} placement='rightTop'>rightTop</Popup>
    <Popup trigger={right} placement='right'>right</Popup>
    <Popup trigger={rightBottom} placement='rightBottom'>rightBottom</Popup>
    </div>
    <div style={{ marginLeft: 75, clear: 'both' }}>
    <Popup trigger={bottomLeft} placement='bottomLeft'>bottomLeft</Popup>
    <Popup trigger={bottom} placement='bottom'>bottom</Popup>
    <Popup trigger={bottomRight} placement='bottomRight'>bottomRight</Popup>
    </div>
  </div>
}