import React from 'react'
import Slider from 'react-slick'

export default function Home() {

    const carousel_settings = {
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 500,
        arrows: false,
    };

    return (
        <section className={["sections", styles.sectionIntro].join(" ")}>
            <div className="backgrounds" id="introBg">
                <Slider {...carousel_settings}>
                    <div className={styles.carouselItem}>
                        <div className={styles.introBgBox}>
                            <img
                                src={process.env.PUBLIC_URL + "imgs/home/home_bg0.jpg"}
                                alt="온어스메인"
                                className={styles.introBgImg}/>
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.introBgBox}>
                            <img
                                src={process.env.PUBLIC_URL + "imgs/home/home_bg1.jpg"}
                                alt="온어스메인"
                                className={styles.introBgImg}/>
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.introBgBox}>
                            <img
                                src={process.env.PUBLIC_URL + "imgs/home/home_bg2.jpg"}
                                alt="온어스메인"
                                className={styles.introBgImg}/>
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.introBgBox}>
                            <img
                                src={process.env.PUBLIC_URL + "imgs/home/home_bg3.jpg"}
                                alt="온어스메인"
                                className={styles.introBgImg}/>
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.introBgBox}>
                            <img
                                src={process.env.PUBLIC_URL + "imgs/home/home_bg4.jpg"}
                                alt="온어스메인"
                                className={styles.introBgImg}/>
                        </div>
                    </div>
                </Slider>
            </div>
            <div className="containers containerIntro">
                <div className={styles.introMsg}>
                    <p className={styles.introMsgContent}>
                        지역에 점을 찍고 연결하는 사람들.
                    </p>
                    <p className={styles.introMsgContent}>
                        사회적 협동조합 온어스.
                    </p>
                </div>
            </div>
        </section>
    );
}
