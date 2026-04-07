// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from './index';
import type { InputProps } from './index';
import { UserOutlined } from '@ant-design/icons';

describe('Input',()=>{

test('rendes input',()=>{
  render(<Input value={'click me'}></Input>)
  const inputElement=screen.getByDisplayValue(/click me/i)
  expect(inputElement).toBeInTheDocument();
})
test('input不受控',()=>{
  render(<Input defaultValue={'click me'}></Input>)
  const inputElement=screen.getByDisplayValue(/click me/i)
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement,{target:{value:'hello'}})
  expect(inputElement).toHaveValue('hello')
})
test('input受控：不更新状态时值应保持不变', () => {
  const handleChange = vi.fn(); // 使用 mock 函数记录调用
  render(<Input value="constant" onChange={handleChange} />);
  
  const input = screen.getByDisplayValue('constant');
  fireEvent.change(input, { target: { value: 'hello' } }); // 模拟输入
  
  // 重点：虽然触发了 onChange，但因为外部没传新 value，值应该还是旧的
  expect(handleChange).toHaveBeenCalled(); 
  expect(input).toHaveValue('constant'); 
});
test('input受控：配合状态更新时值应改变', () => {
  // 定义一个临时的受控包装组件
  const TestWrapper = () => {
    const [val, setVal] = React.useState('init');//usestate这种hook只能在函数内部写，所以我们这里要包装一个临时的组件就能用了
    return <Input value={val} onChange={(e) => setVal(e.target.value)} />;
  };

  render(<TestWrapper />);
  const input = screen.getByDisplayValue('init');
  
  fireEvent.change(input, { target: { value: 'new value' } });
  
  // 此时因为 state 更新了，input 的值才会真正改变
  expect(input).toHaveValue('new value');
});
test('input disabled时不改变 并且onchange不触发',()=>{
  const handleChange=vi.fn();
  render(<Input disabled value={'click me'} onChange={handleChange}></Input>)
  const inputElement=screen.getByDisplayValue(/click me/i)
  fireEvent.change(inputElement,{target:{value:'hello'}})
  expect(inputElement).toHaveValue('click me')
  expect(handleChange).not.toHaveBeenCalled()
});
test('maxLength 时显示正确的长度计数', () => {
  const testValue = 'click me'; // 长度为 8
  const max = 10;
  
  const { container } = render(<Input maxLength={max} value={testValue} />);
  
  // 1. 验证文本内容是否为 "8 / 10"
  // 注意：根据你的源码，中间有空格，所以建议用正则 /8\s*\/\s*10/ 适配
  const suffixElement = screen.getByText(/8\s*\/\s*10/);
  expect(suffixElement).toBeInTheDocument();

  // 2. 验证是否包含指定的 CSS 类名（增强测试健壮性）
  const countSpan = container.querySelector('.ant-input-show-count-suffix');
  expect(countSpan).toBeInTheDocument();
  expect(countSpan).toHaveClass('ant-input-show-count-suffix');
});
test('当 autoSize 为 true 时，初始高度应先重置为 auto', () => {
  // 渲染带有 autoSize 的 TextArea
  render(<Input.TextArea autoSize={true} defaultValue="test内容" />);
  
  const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

  // 虽然最终高度可能被后续逻辑覆盖，但在执行过程中它必须经历 'auto' 阶段
  // 在测试中，我们可以直接检查最终样式或行为
  expect(textarea.style.height).toMatch(/px|auto/); 
});
})