import React, { useState } from 'react';
import { withRouter } from 'dva/router';
import { Spin } from 'antd';
import {
  registerMicroApps,
  start,
  // setDefaultMountApp,
  runAfterFirstMounted,
} from 'qiankun';
import MainLayout from './layout';
import Login from '@/routes/login';
import { apps } from '@/microConfig';

import styles from './app.less';

const App: React.FC<any> = ({ children, location }): any => {
  const [loading, setLoading] = useState<boolean>(true);

  registerMicroApps(apps, {
    beforeLoad: (app): any => {
      console.log('before load app.name=====>>>>>', app.name);
    },
    beforeMount: (app): any => {
      // console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
    afterMount: (app): any => {
      // console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
      setLoading(false);
    },
    afterUnmount: (app): any => {
      // console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  });


  start();

  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });

  if (location.pathname.includes('login')) {
    return <div><Login /></div>;
  }

  return (
    <MainLayout>
      <div className={styles.flexContent}>
        {loading && <div className={styles.loading}><Spin /></div>}
        <div id="subapp" />
      </div>
    </MainLayout>
  );
};

export default withRouter(App);
