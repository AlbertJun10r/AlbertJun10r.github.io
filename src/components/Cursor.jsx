import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.transform = 'translate(-50%, -50%)';
    };

    const onEnter = () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.backgroundColor = '#FBFF48';
      cursor.style.mixBlendMode = 'normal';
      cursor.style.border = '2px solid black';
    };

    const onLeave = () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.backgroundColor = '#fff';
      cursor.style.mixBlendMode = 'difference';
      cursor.style.border = 'none';
    };

    document.addEventListener('mousemove', onMove);

    const attachHoverListeners = () => {
      const hoverEls = document.querySelectorAll('.cursor-hover, a, button, input, textarea');
      hoverEls.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Attach after mount so all elements are rendered
    const timer = setTimeout(attachHoverListeners, 200);

    return () => {
      document.removeEventListener('mousemove', onMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="cursor"
      ref={cursorRef}
      className="w-6 h-6 bg-white rounded-full border-2 border-black hidden lg:block"
    />
  );
}
