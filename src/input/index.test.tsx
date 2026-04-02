// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from './index';
import type { InputProps } from './index';

describe('Input',()=>{
  test('renders Input', () => {
    render(<Input onClick={()=>{}} onBlur={()=>{}}>click me</Input>);
    const InputElement = screen.getByText(/click me/i);
    expect(InputElement).toBeInTheDocument();
  });
  test('renders Input with type', () => {
    render(<Input type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Input>);
    const InputElement = screen.getByText(/click me/i);
    expect(InputElement).toBeInTheDocument();
  });
  test('renders Input primary',()=>{
    render(<Input type='primary'>click me</Input>)
    const inputElement = screen.getByText(/click me/i);
    expect(inputElement).toHaveClass('ant-input-primary');
  })
  test('renders Input with size', () => {
    render(<Input size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Input>);
    const InputElement = screen.getByText(/click me/i);
    expect(InputElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Input onClick={onClick} type='primary' onBlur={()=>{}}>click me</Input>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})