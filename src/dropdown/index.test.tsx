// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from './index';
import type { DropdownProps } from './index';

describe('Dropdown',()=>{
  test('renders Dropdown', () => {
    render(<Dropdown onClick={()=>{}} onBlur={()=>{}}>click me</Dropdown>);
    const DropdownElement = screen.getByText(/click me/i);
    expect(DropdownElement).toBeInTheDocument();
  });
  test('renders Dropdown with type', () => {
    render(<Dropdown type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Dropdown>);
    const DropdownElement = screen.getByText(/click me/i);
    expect(DropdownElement).toBeInTheDocument();
  });
  test('renders Dropdown primary',()=>{
    render(<Dropdown type='primary'>click me</Dropdown>)
    const dropdownElement = screen.getByText(/click me/i);
    expect(dropdownElement).toHaveClass('ant-dropdown-primary');
  })
  test('renders Dropdown with size', () => {
    render(<Dropdown size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Dropdown>);
    const DropdownElement = screen.getByText(/click me/i);
    expect(DropdownElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Dropdown onClick={onClick} type='primary' onBlur={()=>{}}>click me</Dropdown>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})