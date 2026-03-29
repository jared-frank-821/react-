// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Icon from './index';

describe('Icon',()=>{
  test('renders icon',()=>{
   const {container} = render(<Icon type='fixed' />)
   expect(container.querySelector('svg')).toBeInTheDocument();

  });
  test('renders icon with type',()=>{
    const {container} = render(<Icon type='copy' />)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
  test('renders icon with size',()=>{
    const {container} =render(<Icon type='fixed' size={20} />)
    expect(container.querySelector('svg')).toHaveStyle({width:'20px',height:'20px'});
  });
  test('render with onclick',()=>{
    const onClick=vi.fn();
    const {container} =render(<Icon type='fixed' onClick={onClick} />)
    fireEvent.click(container.querySelector('svg') as SVGElement);
    expect(onClick).toHaveBeenCalled();
  });
})