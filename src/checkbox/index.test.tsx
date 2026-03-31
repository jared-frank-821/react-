import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './index';

describe('Checkbox', () => {
  test('renders Checkbox', () => {
    render(<Checkbox>click me</Checkbox>);
    const CheckboxElement = screen.getByText(/click me/i);
    expect(CheckboxElement).toBeInTheDocument();
  });

  test('renders Checkbox with checked state', () => {
    render(<Checkbox defaultChecked>click me</Checkbox>);
    const checkboxInput = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkboxInput.checked).toBe(true);
  });

  test('renders Checkbox with disabled', () => {
    render(<Checkbox disabled>click me</Checkbox>);
    const checkboxInput = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkboxInput.disabled).toBe(true);
  });

  test('should toggle on click', () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox onChange={onChange}>click me</Checkbox>);
    const checkboxInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(checkboxInput);
    expect(onChange).toHaveBeenCalled();
  });
});
