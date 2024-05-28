import React from 'react'

import styles from '../../css/pickage/PickageCard.module.css';

export default function PickageCard({thumb, handler}) {
  return (
    <div className={styles.pickageCard} onClick={handler}>
        <div className={styles.imgBox}>
            <img src={thumb} alt='cardImg' className={styles.cardImg} />
        </div>
    </div>
  )
}
