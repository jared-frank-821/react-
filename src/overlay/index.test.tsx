// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Overlay from './index';
import type { OverlayProps } from './index';

describe('Overlay',()=>{
  test('renders Overlay', () => {
    render(<Overlay onClick={()=>{}} onBlur={()=>{}}>click me</Overlay>);
    const OverlayElement = screen.getByText(/click me/i);
    expect(OverlayElement).toBeInTheDocument();
  });
  test('renders Overlay with type', () => {
    render(<Overlay type="primary" onClick={()=>{}} onBlur={()=>{}}>click me</Overlay>);
    const OverlayElement = screen.getByText(/click me/i);
    expect(OverlayElement).toBeInTheDocument();
  });
  test('renders Overlay primary',()=>{
    render(<Overlay type='primary'>click me</Overlay>)
    const overlayElement = screen.getByText(/click me/i);
    expect(overlayElement).toHaveClass('ant-overlay-primary');
  })
  test('renders Overlay with size', () => {
    render(<Overlay size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Overlay>);
    const OverlayElement = screen.getByText(/click me/i);
    expect(OverlayElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Overlay onClick={onClick} type='primary' onBlur={()=>{}}>click me</Overlay>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})