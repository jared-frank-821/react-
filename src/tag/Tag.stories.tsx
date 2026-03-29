import type { Meta, StoryObj } from '@storybook/react-vite';

import Tag from './index';

const meta = {
  title: 'Example/Tag',// 在 Storybook 侧边栏中的路径
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],//让 Storybook 自动根据组件 props 生成文档页
  argTypes: {
    color: { control: 'select', options: ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'pink', 'gray'] },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <>
      <Tag closeable>Tag 1</Tag>
      <Tag closeable>
        <a
          href="https://github.com/ant-design/ant-design/issues/1862"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </a>
      </Tag>
      <Tag closeable>Prevent Default</Tag>
      <Tag closeable>Tag 2</Tag>
      <Tag closeable onClose={console.log}>Tag 3</Tag>
    </>
  ),
};