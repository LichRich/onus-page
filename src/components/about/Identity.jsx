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
                <h2 className={styles.identityTitle}>IDENTITY</h2>
            </div>
            <div className={styles.contentsBox}>
                {/* <img id={styles.identityImg} src={"https://lichrich.github.io/onus-page/" + "imgs/about/identity.png"} alt="아이덴티티" className={styles.identity} /> */}
                <img id={styles.identityImg} src={process.env.PUBLIC_URL + "/imgs/about/identity.png"} alt="아이덴티티" className={styles.identity} />
                <div className={styles.contents}>
                    <div className={styles.contentsTitleBox}>
                        <p className={styles.contentsTitle}>
                            LOCAL
                        </p>
                        <span>지역</span>
                    </div>
                    <div className={styles.contentsDescBox}>
                        <span className={styles.contentsDesc}>지역 청년 및 청년기업으로 구성되어 있으며</span>
                        <span className={styles.contentsDesc}>지역자원을 활용한 다양한 콘텐츠를 창출함으로써</span>
                        <span className={styles.contentsDesc}>지역 활성화를 이끕니다.</span>
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.contentsTitleBox}>
                        <p className={styles.contentsTitle}>
                            SYNERGY
                        </p>
                        <span>동반성장</span>
                    </div>
                    <div className={styles.contentsDescBox}>
                        <span className={styles.contentsDesc}>
                        지역에서 함게 살아가기 위한 방안들을
                        </span>
                        <span className={styles.contentsDesc}>
                        고민하고 시도합니다.
                        </span>
                        <span className={styles.contentsDesc}>
                        경쟁이 아닌 상생화 협력을 통한
                        </span>
                        <span className={styles.contentsDesc}>
                        동반성장을 추구합니다.
                        </span>
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.contentsTitleBox}>
                        <p className={styles.contentsTitle}>
                            COMMUNITY
                        </p>
                        <span>공동체</span>
                    </div>
                    <div className={styles.contentsDescBox}>
                        <span className={styles.contentsDesc}>공동의 미션과 비전을 향해 나아가는 공동체입니다.</span>
                        <span className={styles.contentsDesc}>단순히 '일'을 함께하는 관계를 넘어</span>
                        <span className={styles.contentsDesc}>함께 일하고, 쉬고, 사는 공동체를 꿈꿉니다.</span>
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.contentsTitleBox}>
                        <p className={styles.contentsTitle}>
                            CREATIVE
                        </p>
                        <span>창의적인</span>
                    </div>
                    <div className={styles.contentsDescBox}>
                        <span className={styles.contentsDesc}>다양한 지역 자원을 다양한 관점으로 바라보며</span>
                        <span className={styles.contentsDesc}>새롭게 해석하여 새로운 가치를 창출합니다.</span>
                        <span className={styles.contentsDesc}>지역에서의 새로운 실험과 시도를 하고</span>
                        <span className={styles.contentsDesc}>지역의 작고 사소한 변화를 만들어 갑니다.</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
