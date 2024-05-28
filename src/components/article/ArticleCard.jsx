import React from 'react'

import styles from '../../css/article/ArticleCard.module.css';

export default function ArticleCard({thumbnail, title, date, category, handler}) {
  return (
      <div className={styles.articleCard} onClick={handler}>
          <div className={styles.imgBox}>
              <img src={thumbnail} alt="cardImg" className={styles.cardImg} />
          </div>
          <div className={styles.contentBox}>
              <div className={styles.titleBox}>
                  <p className={styles.title}>{title}</p>
              </div>
          </div>
          <div className={styles.bglt}></div>
          <div className={styles.bgrt}></div>
          <div className={styles.bglb}></div>
          <div className={styles.bgrb}></div>
      </div>
  )
}
