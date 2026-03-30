import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Radio from './index';

describe('Radio', () => {
  // 基础渲染
  test('renders Radio with children', () => {
    render(<Radio>click me</Radio>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  // 渲染出 label 包裹结构，根元素有 ant-radio 类
  test('renders with ant-radio class', () => {
    const { container } = render(<Radio>click me</Radio>);
    expect(container.firstChild).toHaveClass('ant-radio');
  });

  // 受控：checked=true 时有 ant-radio-checked 类
  test('renders checked state with ant-radio-checked class', () => {
    const { container } = render(<Radio checked={true} onChange={() => {}}>click me</Radio>);
    expect(container.firstChild).toHaveClass('ant-radio-checked');
  });

  // 受控：checked=false 时没有 ant-radio-checked 类
  test('renders unchecked state without ant-radio-checked class', () => {
    const { container } = render(<Radio checked={false} onChange={() => {}}>click me</Radio>);
    expect(container.firstChild).not.toHaveClass('ant-radio-checked');
  });

  // 非受控：defaultChecked=true 初始有 checked
  test('renders with defaultChecked=true, input is checked', () => {
    const { container } = render(<Radio defaultChecked={true}>click me</Radio>);
    const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  // 非受控：defaultChecked 默认 false
  test('renders with defaultChecked=false by default', () => {
    const { container } = render(<Radio>click me</Radio>);
    const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  // disabled：有 ant-radio-disabled 类，input 有 disabled 属性
  test('renders disabled state', () => {
    const { container } = render(<Radio disabled>click me</Radio>);
    expect(container.firstChild).toHaveClass('ant-radio-disabled');
    const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  // disabled 时 onChange 不触发
  test('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    const { container } = render(<Radio disabled onChange={onChange}>click me</Radio>);
    const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  // onChange 在点击 input 时触发
  test('calls onChange when input is clicked', () => {
    const onChange = vi.fn();
    const { container } = render(<Radio checked={false} onChange={onChange}>click me</Radio>);
    const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // 点击 label 文字区域也能触发 onChange（因为 label 与 input 关联）
  test('calls onChange when label text is clicked', () => {
    const onChange = vi.fn();
    render(<Radio checked={false} onChange={onChange}>click me</Radio>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // 自定义 className 挂在根元素上
  test('applies custom className', () => {
    const { container } = render(<Radio className="my-radio">click me</Radio>);
    expect(container.firstChild).toHaveClass('my-radio');
  });

  // 自定义 style 挂在根元素上
  test('applies custom style', () => {
    const { container } = render(<Radio style={{ color: 'red' }}>click me</Radio>);
    expect(container.firstChild).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  // 非受控模式：点击后内部状态切换，input.checked 变为 true
  test('uncontrolled: toggles checked state on click', () => {
    const { container } = render(<Radio>click me</Radio>);
    const input = container.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });
});
