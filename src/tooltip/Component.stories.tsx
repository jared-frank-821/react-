import type { Meta, StoryObj } from '@storybook/react-vite';

import Tooltip from './index';
import {  ConfigProvider, Flex, Segmented } from 'antd';
import Button from '../button/index';
import { useMemo, useState } from 'react';
import type { tooltipProps } from './Tooltip';
const meta = {
  title: 'Example/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
 render:()=>{
  return(
    <>
    <Tooltip title="prompt text" placement='top'>
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
    </>
  )
 }
};

export const Placement: Story = {
  render:()=>{
    const text = <span>prompt text</span>;
    const buttonWidth = 80;
    const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  const mergedArrow = useMemo<tooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
    return(
      <>
      <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      <Segmented
        value={arrow}
        options={['Show', 'Hide', 'Center']}
        onChange={setArrow}
        style={{ marginBottom: 24 }}
      />
      <Flex vertical justify="center" align="center" className="demo">
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="topLeft" title={text} arrow={mergedArrow}>
            <Button>TL</Button>
          </Tooltip>
          <Tooltip placement="top" title={text} arrow={mergedArrow}>
            <Button>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" title={text} arrow={mergedArrow}>
            <Button>TR</Button>
          </Tooltip>
        </Flex>
        <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
          <Flex align="center" vertical>
            <Tooltip placement="leftTop" title={text} arrow={mergedArrow}>
              <Button>LT</Button>
            </Tooltip>
            <Tooltip placement="left" title={text} arrow={mergedArrow}>
              <Button>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text} arrow={mergedArrow}>
              <Button>LB</Button>
            </Tooltip>
          </Flex>
          <Flex align="center" vertical>
            <Tooltip placement="rightTop" title={text} arrow={mergedArrow}>
              <Button>RT</Button>
            </Tooltip>
            <Tooltip placement="right" title={text} arrow={mergedArrow}>
              <Button>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text} arrow={mergedArrow}>
              <Button>RB</Button>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="bottomLeft" title={text} arrow={mergedArrow}>
            <Button>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" title={text} arrow={mergedArrow}>
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            <Button>BR</Button>
          </Tooltip>
        </Flex>
      </Flex>
    </ConfigProvider>
      </>
    )
  }
}

export const Adujst:Story={
  render:()=>{
    return(
      <>

      <Tooltip placement='leftTop' title={<div style={{width:200,height:200}} >'prompt text' </div>} >
      <Button>左上角to右上角</Button>
      </Tooltip>
      <br/><br/>
      <Tooltip placement='bottomRight' title={<div style={{width:200,height:200}} >'prompt text' </div>} >
      <Button>右下角to右上角</Button>
      </Tooltip>
      <br/><br/>
      <Tooltip placement='top' title={<div style={{width:200,height:200}} >'prompt text' </div>} >
      <Button>top变成贴边</Button>
      </Tooltip>
      </>
    )
  }
}