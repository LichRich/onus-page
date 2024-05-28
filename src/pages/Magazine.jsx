import React from 'react'

import styles from '../css/magazine/Magazine.module.css';

export default function Magazine() {
  return (
    <section className={["sections",styles.magazineSection].join(" ")}>
        <div className={styles.container}>
            <div className={styles.titleBox}>
                <p className={styles.title}>MAGAZINE</p>
            </div>
            <div className={styles.contentsList}>
                <div className={styles.imgBox}>
                    <a id={styles.first} href='https://firebasestorage.googleapis.com/v0/b/onus-page.appspot.com/o/magazine%2F%EB%8F%84%EA%B3%A0%EB%8F%84%EA%B0%90%202022%20-%20DOGO%EC%98%A8%EC%B2%9C.pdf?alt=media&token=5ffef638-06dc-497a-a062-2453e8058617' target='_blank'>
                    <img src={process.env.PUBLIC_URL + "/imgs/magazines/2022pdf_thumbnail.png"} className={styles.cardThumbnail} alt="매거진 이미지" /></a>
                </div>
                <div className={styles.imgBox}>
                    <a href='https://firebasestorage.googleapis.com/v0/b/onus-page.appspot.com/o/magazine%2F%EC%98%A8%EC%96%B4%EC%8A%A4-2023%20%EB%8F%84%EA%B3%A0%EB%8F%84%EA%B0%90.pdf?alt=media&token=f3cf2467-af51-4902-af33-5daa5fca0f04' target='_blank'>
                    <img src={process.env.PUBLIC_URL + "/imgs/magazines/2023pdf_thumbnail.png"} className={styles.cardThumbnail} alt="매거진 이미지" /></a>
                </div>
            </div>
        </div>
    </section>
  )
}
