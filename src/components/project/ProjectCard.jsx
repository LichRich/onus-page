import React from 'react'

export default function ProjectCard({data, handler}) {

    const getData = () => {
        return (
            data.map((item) => {
                return (
                    <div
                        key={item.id}
                        className={StyleSheet.cardDiv}
                        onClick={() => handler(item)}>
                        <div className={styles.card}>
                            <div className={styles.imgBox}>
                                <img src={item.thumbnail} className={styles.cardThumbnail} alt="프로젝트 이미지" />
                            </div>
                        </div>
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
