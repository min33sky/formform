import { useEffect, useState } from 'react';

/**
 * Viewport의 크기를 반환하는 훅입니다.
 * @returns {Object} { width: number, height: number }
 */
export default function useViewportSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const { innerWidth, innerHeight } = window;
      setWidth(innerWidth);
      setHeight(innerHeight);
    });

    observer.observe(window.document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { width, height };
}
