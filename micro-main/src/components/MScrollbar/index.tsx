import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const MScrollbar: React.FC = ({ children }) => {
  const containerRef: any = useRef();

  useEffect(() => {
    // 给当前节点的父节点的class列表增加属性
    containerRef.current.parentNode.classList.add(styles.mscroll);
    let timer: any = null;
    containerRef.current.parentNode.onscroll = () => {
      clearTimeout(timer);
      containerRef.current.parentNode.classList.add(styles.onScroll);
      timer = setTimeout(() => {
        containerRef.current.parentNode.classList.remove(styles.onScroll);
      }, 800);
    };
  });

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default MScrollbar;
