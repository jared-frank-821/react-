import { render, fireEvent, screen } from '@testing-library/react';
import Affix from './Affix';

describe('Affix Component', () => {
  // 模拟 getBoundingClientRect，因为 JSDOM 中所有元素的宽高位置默认都是 0
  const mockGetBoundingClientRect = (top: number) => {
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 40,
      top: top,
      left: 0,
      bottom: top + 40,
      right: 100,
    } as DOMRect));
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should affix to top when scroll reaches offsetTop', () => {
    // 初始位置在下方（200px），不会固钉
    mockGetBoundingClientRect(200);
    const { container } = render(
      <Affix offsetTop={50}>
        <button>Affix Target</button>
      </Affix>
    );

    const affixDiv = container.querySelector('.ant-affix') as HTMLElement;
    expect(affixDiv.style.position).toBe('');

    // 模拟滚动：元素距离顶部变为 20px (小于 offsetTop 50px)
    mockGetBoundingClientRect(20);
    fireEvent.scroll(window);

    // 检查是否应用了 fixed 样式
    expect(affixDiv.style.position).toBe('fixed');
    expect(affixDiv.style.top).toBe('50px');
  });

  test('should un-affix when scroll back', () => {
    mockGetBoundingClientRect(20);
    const { container } = render(
      <Affix offsetTop={50}>
        <button>Affix Target</button>
      </Affix>
    );

    const affixDiv = container.querySelector('.ant-affix') as HTMLElement;
    fireEvent.scroll(window);
    expect(affixDiv.style.position).toBe('fixed');

    // 往回滚动，元素距离顶部变为 100px
    mockGetBoundingClientRect(100);
    fireEvent.scroll(window);

    expect(affixDiv.style.position).toBe('');
  });

  test('should work with target container', () => {
    const containerRef = { current: document.createElement('div') };
    // 模拟容器位置
    containerRef.current.getBoundingClientRect = vi.fn(() => ({ top: 0 } as DOMRect));
    
    // 元素在容器内位置
    mockGetBoundingClientRect(-10); // 已经向上卷出容器

    const { container } = render(
      <Affix offsetTop={0} target={() => containerRef.current}>
        <button>Container Affix</button>
      </Affix>
    );

    const affixDiv = container.querySelector('.ant-affix') as HTMLElement;
    fireEvent.scroll(containerRef.current);

    expect(affixDiv.style.position).toBe('absolute');
    expect(affixDiv.style.top).toBe('0px');
  });
});