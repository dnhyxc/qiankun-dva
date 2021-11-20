import React from 'react';
import { Menu } from 'antd';
import menuList from '@/config/menu';
import { Link } from 'dva/router';
import styles from './index.less';

const { SubMenu } = Menu;

interface IProps {
  children: any;
  title?: string;
}

const Header: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <Menu mode="horizontal">
          <SubMenu
            key="SubMenu"
            title={(
              <div className={styles.icon}>
                <div className={styles.menuIcon} />
                <div className={styles.menuIcon} />
                <div className={styles.menuIcon} />
              </div>
            )}
            style={{ border: 'none' }}
          >
            {menuList.map(i => {
              return (
                <Menu.ItemGroup title={i.title} key={i.key}>
                  {i.children.map(child => {
                    return (
                      <Menu.Item key={child.key}>
                        <Link to={child.path}>{child.title}</Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.ItemGroup>
              );
            })}
          </SubMenu>
        </Menu>
      </div>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.headerContent}>
        {children}
      </div>
    </div>
  );
};

export default Header;
