// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from './index';

describe('Switch',()=>{
test('renders Switch',()=>{
  render(<Switch defaultChecked={true} />)
  const switchElement = screen.getByRole('switch')
  expect(switchElement).toBeInTheDocument()
});
test('renders switch with loading',()=>{
  render(<Switch loading defaultChecked={true} />)
  const switchElement = screen.getByRole('switch')
  expect(switchElement).toHaveClass('ant-switch-loading')
  expect(switchElement).toHaveClass('ant-switch-disabled')
});
test('renders switch with size',()=>{
render(<Switch size='small' defaultChecked={false} />)
const switchEle=screen.getByRole('switch')
expect(switchEle).not.toHaveClass('ant-switch-checked')
fireEvent.click(switchEle)
expect(switchEle).toHaveClass('ant-switch-checked')
});
test('should support click',()=>{
  const onClick=vi.fn();
  render(<Switch defaultChecked={false} onClick={onClick} />)
  const switchEle=screen.getByRole('switch')
  fireEvent.click(switchEle)
  expect(onClick).toHaveBeenCalled()
});
})