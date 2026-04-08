import { render, act } from '@testing-library/react';
import Affix from './index';

const setScrollTop = (el: Window | Element, value: number) => {
  if (el === window) {
    Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true });
    (window as Window & { scrollY: number }).scrollY = value;
  } else {
    Object.defineProperty(el, 'scrollTop', { value, writable: true, configurable: true });
    (el as HTMLElement).scrollTop = value;
  }
};

const mockGetBoundingClientRect = (el: Element, top: number) => {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom: top + 40,
    left: 0,
    right: 100,
    width: 100,
    height: 40,
    x: 0,
    y: top,
    toJSON: () => ({}),
  } as DOMRect);
};

const scrollTo = (target: Window | Element, scrollTop: number) => {
  setScrollTop(target, scrollTop);
  act(() => {
    if (target === window) {
      window.dispatchEvent(new Event('scroll'));
    } else {
      (target as HTMLElement).dispatchEvent(new Event('scroll'));
    }
  });
};

describe('Affix', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  describe('基础渲染', () => {
    test('渲染子元素', () => {
      const { container } = render(<Affix>内容</Affix>);
      expect(container.textContent).toBe('内容');
    });

    test('渲染时有 ant-affix class', () => {
      const { container } = render(<Affix>test</Affix>);
      expect(container.querySelector('.ant-affix')).toBeTruthy();
    });

    test('支持 className prop', () => {
      const { container } = render(
        <Affix className="my-class">test</Affix>
      );
      const el = container.querySelector('.ant-affix');
      expect(el).toHaveClass('my-class');
    });
  });

  describe('offsetTop 吸顶', () => {
    let wrapper: HTMLDivElement;

    beforeEach(() => {
      const { container } = render(<Affix offsetTop={0}>test</Affix>);
      wrapper = container.querySelector('.ant-affix') as HTMLDivElement;
      mockGetBoundingClientRect(wrapper, 200);
      setScrollTop(window, 0);
    });

    test('未滚动时不应用 position fixed', () => {
      scrollTo(window, 0);
      expect(wrapper.style.position).toBe('');
    });

    test('滚动超过 offsetTop 时应用 position fixed 并设置 top', () => {
      scrollTo(window, 300);
      expect(wrapper.style.position).toBe('fixed');
      expect(wrapper.style.top).toBe('0px');
    });

    test('滚动超过 offsetTop 时设置正确的 width 和 height', () => {
      scrollTo(window, 300);
      expect(wrapper.style.position).toBe('fixed');
      expect(wrapper.style.width).toBe('100px');
      expect(wrapper.style.height).toBe('40px');
    });

    test('自定义 offsetTop', () => {
      const { container } = render(<Affix offsetTop={100}>test</Affix>);
      const el = container.querySelector('.ant-affix') as HTMLDivElement;
      mockGetBoundingClientRect(el, 100);
      scrollTo(window, 0);
      expect(el.style.position).toBe('fixed');
      expect(el.style.top).toBe('100px');
    });

    test('向上滚回时清除 fixed 样式', () => {
      scrollTo(window, 500);
      expect(wrapper.style.position).toBe('fixed');
      scrollTo(window, 0);
      expect(wrapper.style.position).toBe('');
    });
  });

  describe('offsetBottom 吸底', () => {
    test('滚动到底部时应用 position fixed 并设置 bottom', () => {
      const { container } = render(<Affix offsetBottom={0}>test</Affix>);
      const wrapper = container.querySelector('.ant-affix') as HTMLDivElement;
      mockGetBoundingClientRect(wrapper, 300);

      scrollTo(window, 0);
      expect(wrapper.style.position).toBe('');

      scrollTo(window, 500);
      expect(wrapper.style.position).toBe('fixed');
      expect(wrapper.style.bottom).toBe('0px');
      expect(wrapper.style.width).toBe('100px');
      expect(wrapper.style.height).toBe('40px');
    });

    test('自定义 offsetBottom', () => {
      const { container } = render(<Affix offsetBottom={20}>test</Affix>);
      const wrapper = container.querySelector('.ant-affix') as HTMLDivElement;
      mockGetBoundingClientRect(wrapper, 300);

      scrollTo(window, 500);
      expect(wrapper.style.position).toBe('fixed');
      expect(wrapper.style.bottom).toBe('20px');
    });
  });

  describe('target prop（指定滚动容器）', () => {
    let scrollContainer: HTMLDivElement;
    let addContainerListenerSpy: ReturnType<typeof vi.spyOn>;
    let removeContainerListenerSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      const { container } = render(
        <Affix target={() => scrollContainer} offsetTop={0}>
          test
        </Affix>
      );
      scrollContainer = container.querySelector('.ant-affix')!.parentElement as HTMLDivElement;
      mockGetBoundingClientRect(scrollContainer, 0);

      addContainerListenerSpy = vi.spyOn(scrollContainer, 'addEventListener');
      removeContainerListenerSpy = vi.spyOn(scrollContainer, 'removeEventListener');
    });

    afterEach(() => {
      addContainerListenerSpy.mockRestore();
      removeContainerListenerSpy.mockRestore();
    });

    test('同时监听窗口和容器滚动', () => {
      expect(addContainerListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), false);
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), false);
    });

    test('在容器内滚动时应用 position absolute', () => {
      mockGetBoundingClientRect(scrollContainer, 0);
      scrollTo(scrollContainer, 300);
      expect(scrollContainer.querySelector('.ant-affix')!.getAttribute('style')).toContain('position: absolute');
    });

    test('卸载时移除所有事件监听', () => {
      const { unmount } = render(
        <Affix target={() => scrollContainer} offsetTop={0}>
          test
        </Affix>
      );
      unmount();
      expect(removeContainerListenerSpy).toHaveBeenCalled();
    });
  });

  describe('事件清理', () => {
    test('卸载组件时移除 scroll 监听', () => {
      const { unmount } = render(<Affix offsetTop={0}>test</Affix>);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    test('同时设置 offsetTop 和 offsetBottom 时，offsetTop 优先', () => {
      const { container } = render(
        <Affix offsetTop={0} offsetBottom={0}>test</Affix>
      );
      const wrapper = container.querySelector('.ant-affix') as HTMLDivElement;
      mockGetBoundingClientRect(wrapper, 200);
      scrollTo(window, 300);
      expect(wrapper.style.position).toBe('fixed');
      expect(wrapper.style.top).toBe('0px');
    });
  });
});
