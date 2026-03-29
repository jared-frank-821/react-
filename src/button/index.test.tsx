// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './index';

describe('Button',()=>{
  test('renders button', () => {
    render(<Button onClick={()=>{}} onBlur={()=>{}}>click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test('renders button with type', () => {
    render(<Button type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test('renders button primary',()=>{
    render(<Button type='primary'>click me</Button>)
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass('ant-btn-primary');
  })
  test('renders button with size', () => {
    render(<Button size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Button onClick={onClick} type='primary' onBlur={()=>{}}>click me</Button>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})