import React from 'react'

import styles from '../../css/project/ProjectCard.module.css';

export default function ProjectCard({data, handler}) {

    const getData = () => {
        return (
            data.map((item) => {
                return (
                    <div key={item.title} className={styles.imgBox} onClick={() => handler(item)}>
                        <img src={item.thumbnail} className={styles.cardThumbnail} alt="프로젝트 이미지" />
                    </div>
                )
            })
        )
    }

  return (
    <div className={styles.projectCards}>
        {getData()}
    </div>
  )
}
