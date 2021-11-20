import React from 'react';
import { Modal } from 'antd';

import styles from './index.less';

interface IProps {
  closeModel(): void;
  visible: boolean;
  title: string;
  children: any;
  width: number;
  maskClosable: boolean;
}

const MModel: React.FC<IProps> = ({
  closeModel, visible, title, children, width, maskClosable,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => closeModel && closeModel()}
      centered
      width={width}
      footer={null}
      maskClosable={maskClosable}
    >
      <div className={styles.modelWrapper}>
        {children}
      </div>
    </Modal>
  );
};

export default MModel;
