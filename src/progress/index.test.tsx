import { render, screen } from '@testing-library/react';
import Progress from './index';

describe('Progress Component', () => {
  // 1. 验证基础百分比显示和边界值逻辑
  test('renders correctly with percent and format', () => {
    const { rerender } = render(<Progress percent={30} />);
    expect(screen.getByText('30%')).toBeInTheDocument();

    // 验证边界值：120 应该被限制为 100%
    rerender(<Progress percent={120} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  // 2. 验证 Line 模式下的样式应用
  test('applies correct styles in line type', () => {
    const { container } = render(<Progress percent={50} strokeColor="red" trailColor="blue" />);
    const bg = container.querySelector('.ant-progress-bg') as HTMLElement;
    const inner = container.querySelector('.ant-progress-inner') as HTMLElement;

    expect(bg.style.width).toBe('50%');
    expect(bg.style.backgroundColor).toBe('red');
    expect(inner.style.backgroundColor).toBe('blue');
  });

  // 3. 验证 Circle 模式下的旋转逻辑
  test('calculates rotation correctly for circle type', () => {
    // 50% 时：右半圆应旋转至 50 * 3.6 - 135 = 45deg，左半圆保持初始 -135deg
    const { container } = render(<Progress percent={50} type="circle" />);
    const circles = container.querySelectorAll('div[style*="rotate"]');
    
    expect((circles[0] as HTMLElement).style.transform).toBe('rotate(45deg)');
    expect((circles[1] as HTMLElement).style.transform).toBe('rotate(-135deg)');
  });

  // 4. 验证 100% 时的特殊颜色逻辑
  test('changes color to green when percent is 100', () => {
    const { container } = render(<Progress percent={100} strokeColor="blue" />);
    const bg = container.querySelector('.ant-progress-bg') as HTMLElement;
    
    // 逻辑：currentPercent === 100 时 setCurrentStrokeColor('green')
    expect(bg.style.backgroundColor).toBe('green');
  });
});