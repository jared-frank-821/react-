// import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Tag from './index';

describe('Tag',()=>{
  test('renders tag',()=>{
    render(<Tag closeable>tag1</Tag>)
    const linkElement=screen.getByText('tag1')
    expect(linkElement).toBeInTheDocument();
  });
  test('renders tag with closeable',()=>{
    const {container}=render(<Tag closeable>tag1</Tag>)
    expect(container.querySelector('span')).toBeInTheDocument();
    
  })
})