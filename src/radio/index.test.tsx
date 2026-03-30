// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Radio from './index';
import type { RadioProps } from './index';

describe('Radio',()=>{
  test('renders Radio', () => {
    render(<Radio onClick={()=>{}} onBlur={()=>{}}>click me</Radio>);
    const RadioElement = screen.getByText(/click me/i);
    expect(RadioElement).toBeInTheDocument();
  });
  test('renders Radio with type', () => {
    render(<Radio type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Radio>);
    const RadioElement = screen.getByText(/click me/i);
    expect(RadioElement).toBeInTheDocument();
  });
  test('renders Radio primary',()=>{
    render(<Radio type='primary'>click me</Radio>)
    const radioElement = screen.getByText(/click me/i);
    expect(radioElement).toHaveClass('ant-radio-primary');
  })
  test('renders Radio with size', () => {
    render(<Radio size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Radio>);
    const RadioElement = screen.getByText(/click me/i);
    expect(RadioElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Radio onClick={onClick} type='primary' onBlur={()=>{}}>click me</Radio>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})