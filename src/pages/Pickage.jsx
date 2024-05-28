import React, { useState } from 'react'

import styles from '../css/pickage/Pickage.module.css';
import PickageCard from '../components/pickage/PickageCard';

export default function Pickage() {

    const [currContent, setCurrContent] = useState("");
    const [showContent, setShowContent] = useState(false);

    const openContents = (c) => {
        setCurrContent(c);
        setShowContent(true);
    }
    const closeContetns = () => {
        setCurrContent("");
        setShowContent(false);
    }

    const contentsZone = () => {
        return (
            <div className={styles.contentsZone}>
                <div className={styles.contentsContainer}>
                    <div className={styles.contentsBg} onClick={() => closeContetns()}></div>
                    <div className={styles.contentsImgBox}>
                        <img src={currContent} alt='contents' className={styles.contentsImg} />
                        <div className={styles.contentsCloseBox} onClick={() => closeContetns()}>
                            닫기
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
  return (
    <main>
        <section className={['sections', styles.pickageSection].join(" ")}>
            <div className={styles.pickageContainer}>
                <div className={styles.titleBox}>
                    <p className={styles.title}>PEAKAGE</p>
                </div>
                <div className={styles.contentsBox}>
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_tours.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/tours.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_contents.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/contents.png')} />
                </div>
            </div>

            {showContent && (currContent.length > 0) ? contentsZone() : ""}
        </section>
    </main>
  )
}
