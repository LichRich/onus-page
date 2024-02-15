import React, { useEffect, useRef } from 'react'

import styles from '../../css/about/Identity.module.css';

export default function Identity({setter}) {

    const yRef = useRef();
    useEffect(() => {
        const y = yRef.current.offsetTop;
        setter(y);
    }, [])

  return (
    <section className={["sections", styles.identitySection].join(' ')} id="identity" ref={yRef}>
        <div className={["containers", styles.identityContainer].join(' ')}>
            <div className={styles.identityTitleBox}>
                <h2 className={styles.identityTitle}>아이덴티티</h2>
            </div>
            <div className={styles.contentsBox}>
                <img id={styles.identityImg} src={process.env.PUBLIC_URL + "imgs/about/identity.png"} alt="아이덴티티" className={styles.identity} />
            </div>
        </div>
    </section>
  )
}
