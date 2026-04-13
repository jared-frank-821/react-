// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tooltip from './index';
import type { TooltipProps } from './index';

describe('Tooltip',()=>{
  test('renders Tooltip', () => {
    render(<Tooltip onClick={()=>{}} onBlur={()=>{}}>click me</Tooltip>);
    const TooltipElement = screen.getByText(/click me/i);
    expect(TooltipElement).toBeInTheDocument();
  });
  test('renders Tooltip with type', () => {
    render(<Tooltip type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Tooltip>);
    const TooltipElement = screen.getByText(/click me/i);
    expect(TooltipElement).toBeInTheDocument();
  });
  test('renders Tooltip primary',()=>{
    render(<Tooltip type='primary'>click me</Tooltip>)
    const tooltipElement = screen.getByText(/click me/i);
    expect(tooltipElement).toHaveClass('ant-tooltip-primary');
  })
  test('renders Tooltip with size', () => {
    render(<Tooltip size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Tooltip>);
    const TooltipElement = screen.getByText(/click me/i);
    expect(TooltipElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Tooltip onClick={onClick} type='primary' onBlur={()=>{}}>click me</Tooltip>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})