import React, { useEffect, useState } from 'react'

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

    useEffect(() => {
        if(showContent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showContent])
    
  return (
    <main>
        <section className={['sections', styles.pickageSection].join(" ")}>
            <div className={styles.pickageContainer}>
                <div className={styles.titleBox}>
                    <p className={styles.title}>PEAKAGE</p>
                </div>
                <div className={styles.titleDescBox}>
                    <p className={styles.titleDesc}>취향대로 선택할 수 있는 특별한 여행.</p>
                    <p className={styles.titleDesc}>각각의 컨텐츠를 확인하신 후 홈페이지 오른쪽 상단 문의하기로 글을 남겨주시면</p>
                    <p className={styles.titleDesc}>최상의 여행 스케줄을 제안해드립니다 :)</p>
                    <br />
                    <p className={styles.titleDesc}>전화 문의 : 041-545-0128 </p>
                </div>
                <div className={styles.contentsBox}>
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_tours.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/tours.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_52station.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/52station.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_bookbinding.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/bookbinding.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_drink.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/drink.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_letter.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/letter.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_sealing.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/sealing.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_smartphone.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/smartphone.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_upcycling.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/upcycling.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_xmas_eve.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/xmas_eve.png')} />
                    <PickageCard thumb={process.env.PUBLIC_URL + '/imgs/pickage/thumb_yoga.png'} handler={() => openContents(process.env.PUBLIC_URL + '/imgs/pickage/yoga.png')} />
                </div>
            </div>

            {showContent && (currContent.length > 0) ? contentsZone() : ""}
        </section>
    </main>
  )
}
