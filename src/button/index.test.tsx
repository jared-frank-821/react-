// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './index';
import type { buttonProps } from './Button';

describe('Button',()=>{
  test('renders Button', () => {
    render(<Button onClick={()=>{}} onBlur={()=>{}}>click me</Button>);
    const ButtonElement = screen.getByText(/click me/i);
    expect(ButtonElement).toBeInTheDocument();
  });
  test('renders Button with type', () => {
    render(<Button type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Button>);
    const ButtonElement = screen.getByText(/click me/i);
    expect(ButtonElement).toBeInTheDocument();
  });

  test('renders Button with size', () => {
    render(<Button size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Button>);
    const ButtonElement = screen.getByText(/click me/i);
    expect(ButtonElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Button onClick={onClick} type='primary' onBlur={()=>{}}>click me</Button>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})