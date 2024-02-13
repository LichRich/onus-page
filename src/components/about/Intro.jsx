import React from 'react'
import Slider from "react-slick";

export default function Intro() {

    const carousel_settings = {
        dots: false,
        infinite: true,
        speed: 200,
        fade: true,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 200,
        arrows: false,
    };

  return (
    <section className="sections">
        <div className="backgrounds" id="vIntroBg">
            <div className={styles.introBgBox}>
                <img src={process.env.PUBLIC_URL + "imgs/about/about_test.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
            </div>
        </div>
        <div className={["containers", styles.introContainer].join(' ')}>
            <div className={styles.introTitle}>
                <h2 className={styles.emphasize}>사회적 협동조합 ONUS</h2>
            </div>
            <Slider {...carousel_settings}>
                <div className={styles.carouselItem}>
                    <div className={styles.contentsBox}>
                        <p className={styles.contents}>온어스는 경쟁이 아닌 상생과 협력을 택한 청년기업들이</p>
                        <p className={styles.contents}>지역에서 함께 살아가기 위해 설립한 사회적협동조합 입니다.</p>
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.contentsBox}>
                        <p className={styles.contents}>지역공동체를 통한 상생과 시너지를 추구하며</p>
                        <p className={styles.contents}>지역자원을 새로운 관점으로 재해석하여</p>
                        <p className={styles.contents}>매력적인 콘텐츠로 풀어가는 활동을 합니다.</p>
                    </div>
                </div>
            </Slider>
        </div>
    </section>
  )
}
