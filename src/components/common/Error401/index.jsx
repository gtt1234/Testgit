import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

const Error404 = () =>
  <div className={styles.normal}>
    <div className={styles.container}>
      <h3 className={styles.title}>ERROR 401</h3>
      <p className={styles.desc}>No Authorization</p>
      <a href="/#"><Button type="primary" style={{ marginTop: 5 }}>Return</Button></a>
    </div>
  </div>;

export default Error404;
