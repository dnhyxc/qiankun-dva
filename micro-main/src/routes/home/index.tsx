import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/react">
        <Button>React</Button>
      </Link>
    </div>
  );
};

export default Home;
