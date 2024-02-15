import React, { useState } from 'react'

import styles from '../css/business/Business.module.css';
import Space from '../components/business/Space';
import LocalContents from '../components/business/LocalContents';

export default function Business({db}) {

  const [currentTab, setCurrentTab] = useState(0);

  const menuTab = ['공간운영', '지역 콘텐츠 개발'];

  const activeMenuHandler = (idx) => {
    setCurrentTab(idx);
  };

  return (
    <main>
      <div className={styles.titleBox}>
        <div className={styles.titleBg}></div>
        <p className={styles.title}>BUSINESS</p>
      </div>
      <div className={styles.tabMenuBox}>
        <ul className={styles.tabMenuList}>
          {
            menuTab.map((el, idx) => {
              return (
                <li
                  key={idx}
                  className={
                    `${idx === currentTab ?
                    styles.activeMenuItem :
                    styles.menuItem}`
                  } onClick={() => activeMenuHandler(idx)}>
                  {el}
                </li>
              )
            })
          }
        </ul>
      </div>
      {currentTab == 0 ? <Space db={db} /> : <LocalContents db={db} />}
    </main>
  )
}
