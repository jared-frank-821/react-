import type { Meta, StoryObj } from '@storybook/react-vite';
import Menu from './index';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import type MenuProps from './index';
import { useState } from 'react';

const meta = {
  title: 'Example/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const App: Story = {
  args: {},
  render: () => {
    const items: MenuProps ['items'] = [
      {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
      },
      {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
      },
      {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
          {
            type: 'group',
            label: 'Item 1',
            children: [
              { label: 'Option 1', key: 'setting:1' },
              { label: 'Option 2', key: 'setting:2' },
            ],
          },
          {
            type: 'group',
            label: 'Item 2',
            children: [
              { label: 'Option 3', key: 'setting:3' },
              { label: 'Option 4', key: 'setting:4' },
            ],
          },
        ],
      },
      {
        key: 'alipay',
        label: (
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        ),
      },
    ];
    
    return <Menu defaultSelectedKeys={['mail']} items={items} />;
  },
};

export const horizontal: Story = {
 
  render: () => {
    const items = [
      {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
      },
      {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
        disabled: true,
      },
      {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
          {
            type: 'group',
            label: 'Item 1',
            children: [
              { label: 'Option 1', key: 'setting:1' },
              { label: 'Option 2', key: 'setting:2' },
            ],
          },
          {
            type: 'group',
            label: 'Item 2',
            children: [
              { label: 'Option 3', key: 'setting:3' },
              { label: 'Option 4', key: 'setting:4' },
            ],
          },
        ],
      },
      {
        key: 'alipay',
        label: (
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        ),
      },
    ];
    
    const [current, setCurrent] = useState('mail');

    return (
      <Menu 
        mode="horizontal" 
        items={items} 
        selectedKeys={[current]} 
        onSelect={(key) => setCurrent(key)} 
      />
    );
  },
};