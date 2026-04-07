import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar from './index';
import { UserOutlined } from '@ant-design/icons';
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Basic: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Avatar size="large" icon={<UserOutlined />} />
        <Avatar icon={<UserOutlined />} />
        <Avatar size="small" icon={<UserOutlined />} />
        <Avatar size={14} icon={<UserOutlined />} />
      </div>
      {/* 方形部分同理 */}
    </div>
  ),
};
export const Type: Story = {
  render:()=>{
    return(
      <>
      <div style={{ display: 'flex', gap: '10px' }}>
    <Avatar icon={<UserOutlined />} />
    <Avatar>U</Avatar>
    <Avatar size={40}>USER</Avatar> 
    <Avatar src={url} />
    <Avatar src={<img src={url} alt="avatar" />} />
    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  </div>
      </>
    )
  }
}
