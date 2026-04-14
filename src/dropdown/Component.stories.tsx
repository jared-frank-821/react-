import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SmileOutlined } from '@ant-design/icons'; // 引入缺失的图标
import { Space } from 'antd'; // 假设你使用了 antd 的 Space 做布局

import Dropdown from './index';
import Menu from '../menu/Menu';
import { type menuProps } from '../menu/Menu'; // 注意是小写的 menuProps
import Button from '../button/Button'; // 确保路径正确

const meta = {
  title: 'Example/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

// 准备菜单数据
const items: menuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    // danger: true, // 你的 MenuItem 接口没有 danger 属性，暂时注释掉
    label: 'a danger item',
  },
];

// 基础展示
export const Primary: Story = {
  render: () => (
    <Dropdown overlay={<Menu items={items} />}>
      <Button>Hover Me</Button>
    </Dropdown>
  ),
};

// 方位展示：修正了之前直接复制 AntD 导致属性不匹配的问题
export const Placement: Story = {
  render: () => (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown overlay={<Menu items={items} />} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown overlay={<Menu items={items} />} placement="bottom">
          <Button>bottom</Button>
        </Dropdown>
        <Dropdown overlay={<Menu items={items} />} placement="bottomRight">
          <Button>bottomRight</Button>
        </Dropdown>
      </Space>
      <Space wrap>
        <Dropdown overlay={<Menu items={items} />} placement="topLeft">
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown overlay={<Menu items={items} />} placement="top">
          <Button>top</Button>
        </Dropdown>
        <Dropdown overlay={<Menu items={items} />} placement="topRight">
          <Button>topRight</Button>
        </Dropdown>
      </Space>
    </Space>
  ),
};