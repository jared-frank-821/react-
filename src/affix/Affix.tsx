import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface affixProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  offsetTop?: number;
  offsetBottom?: number;
  onChange?: (affixed: boolean) => void;
  target?: () => HTMLElement | null;
}

const Affix = (props: affixProps) => {
  const { className, offsetTop, offsetBottom, target, children } = props;
  const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties | null>(null);

  const wraperRefCB = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      const element = node;

      const scrollTarget = target ? target() : window;
      if (!scrollTarget) return;

      function updatePosition() {
        const { width, height } = element.getBoundingClientRect();
        const scrollTarget = target ? target() : window;
        if (!scrollTarget) return;

        const rect = element.getBoundingClientRect();
        const rectTop = scrollTarget === window
          ? rect.top
          : rect.top - (scrollTarget as HTMLElement).getBoundingClientRect().top;

        const pos = scrollTarget === window ? 'fixed' : 'absolute';

        if (offsetTop !== undefined) {
          if (rectTop <= offsetTop) {
            setWrapperStyle({ position: pos, top: offsetTop, width, height });
          } else {
            setWrapperStyle(null);
          }
        } else if (offsetBottom !== undefined) {
          const containerHeight = scrollTarget === window
            ? window.innerHeight
            : (scrollTarget as HTMLElement).clientHeight;
          const scrollBottom = containerHeight - rectTop - height;
          if (scrollBottom <= offsetBottom) {
            setWrapperStyle({ position: pos, bottom: offsetBottom, width, height });
          } else {
            setWrapperStyle(null);
          }
        }
      }

      scrollTarget.addEventListener('scroll', updatePosition, false);
      if (scrollTarget !== window) {
        window.addEventListener('scroll', updatePosition, false);
      }
      updatePosition();

      return () => {
        scrollTarget.removeEventListener('scroll', updatePosition, false);
        if (scrollTarget !== window) {
          window.removeEventListener('scroll', updatePosition, false);
        }
      };
    },
    [offsetTop, offsetBottom, target],
  );

  const cls = classNames({
    'ant-affix': true,
    [className as string]: className,
  });

  return (
    <div>
      <div ref={wraperRefCB} style={wrapperStyle ?? {}} className={cls}>
        {children}
      </div>
    </div>
  );
};

export default Affix;
