import React from 'react'

export default function Identity() {
  return (
    <section className="sections">
        <div className={["containers", styles.introContainer].join(' ')}>
            <div className={styles.introTitle}>
                <h2 className={styles.emphasize}>아이덴티티</h2>
            </div>
            <div className={styles.introContents}>
                <div className={styles.contentsBox}>
                    <img id={styles.identityImg} src={process.env.PUBLIC_URL + "imgs/about/identity.png"} alt="아이덴티티" className={styles.identity} />
                </div>
            </div>
        </div>
    </section>
  )
}
