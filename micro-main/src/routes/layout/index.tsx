import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import MMenu from '@/components/Menu';

import styles from './index.less';

const { Sider, Content } = Layout;

interface ILayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Sider
        width={240}
        theme="light"
        className={styles.sider}
      >
        <MMenu />
      </Sider>
      <Layout className={styles.layoutContent}>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
