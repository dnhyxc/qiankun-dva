import React from 'react';
import styles from './styles/tableConfig.less';

export const tableData = [
  {
    key: '0',
    name: 'router',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react router',
  },
  {
    key: '1',
    name: 'hooks',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react hooks',
  },
  {
    key: '2',
    name: 'dnd',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react dnd',
  },
  {
    key: '3',
    name: 'fiber',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react fiber',
  },
  {
    key: '4',
    name: 'lifecycle',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react life cycle',
  },
  {
    key: '5',
    name: 'router',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react router',
  },
  {
    key: '6',
    name: 'hooks',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react hooks',
  },
  {
    key: '7',
    name: 'dnd',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react dnd',
  },
  {
    key: '8',
    name: 'router',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react router',
  },
  {
    key: '9',
    name: 'hooks',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react hooks',
  },
  {
    key: '10',
    name: 'dnd',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react dnd',
  },
  {
    key: '11',
    name: 'router',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react router',
  },
  {
    key: '12',
    name: 'hooks',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react hooks',
  },
  {
    key: '13',
    name: 'dnd',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react dnd',
  },
  {
    key: '14',
    name: 'fiber',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react fiber',
  },
  {
    key: '15',
    name: 'lifecycle',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react life cycle',
  },
  {
    key: '16',
    name: 'router',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react router',
  },
  {
    key: '17',
    name: 'hooks',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react hooks',
  },
  {
    key: '18',
    name: 'dnd',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react dnd',
  },
  {
    key: '19',
    name: 'router',
    studytimes: '0',
    createtime: '2020-1-19',
    founder: 'dnhyxc',
    description: 'react router',
  },
];

export const setTableColumns = (render: any) => {
  return [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (_: any, re: any) => (
        <div className={styles.tableItem}>{re.name}</div>
      ),
    },
    {
      title: 'STUDYTIMES',
      dataIndex: 'studytimes',
      key: 'studytimes',
      width: '22%',
      render: (_: any, re: any) => (
        <div className={styles.tableItem}>{re.studytimes}</div>
      ),
    },
    {
      title: 'CREATETIME',
      dataIndex: 'createtime',
      key: 'createtime',
      width: '22%',
      render: (_: any, re: any) => (
        <div className={styles.tableItem}>{re.createtime}</div>
      ),
    },
    {
      title: 'FOUNDER',
      dataIndex: 'founder',
      key: 'founder',
      width: '20%',
      render: (_: any, re: any) => (
        <div className={styles.tableItem}>{re.founder}</div>
      ),
    },
    {
      title: <div style={{ display: 'flex', justifyContent: 'flex-end' }}>ACTION</div>,
      dataIndex: '',
      key: 'x',
      width: '16%',
      render: render && render(),
    },
  ];
};
