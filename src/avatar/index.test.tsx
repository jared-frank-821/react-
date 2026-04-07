// import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Avatar from './index';

describe('Avatar',()=>{
  test('renders Avatar', () => {
    render(<Avatar onClick={()=>{}} onBlur={()=>{}}>click me</Avatar>);
    const AvatarElement = screen.getByText(/click me/i);
    expect(AvatarElement).toBeInTheDocument();
  });
  test('renders square Avatar', () => {
    render(<Avatar shape="square" onClick={()=>{}} onBlur={()=>{}}>click me</Avatar>);
    const AvatarElement = screen.getByText(/click me/i);
    expect(AvatarElement).toBeInTheDocument();
  });
  test('renders Avatar square class',()=>{
    render(<Avatar shape='square'>click me</Avatar>)
    const avatarElement = screen.getByText(/click me/i);
    expect(avatarElement.closest('.ant-avatar')).toHaveClass('ant-avatar-square');
  })
  test('renders Avatar with size', () => {
    render(<Avatar size="large" onClick={()=>{}} onBlur={()=>{}}>click me</Avatar>);
    const AvatarElement = screen.getByText(/click me/i);
    expect(AvatarElement).toBeInTheDocument();
  });
  test('should support click',()=>{
    const onClick = vi.fn();
    render(<Avatar onClick={onClick} shape='square' onBlur={()=>{}}>click me</Avatar>);
    const linkElement =screen.getByText(/click me/i)
    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
  })
})
