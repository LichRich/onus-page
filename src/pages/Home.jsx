import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import styles from '../css/home/Home.module.css';

export default function Home() {

    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const resizeTimer = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if(resizeTimer.current !== null) return;
            resizeTimer.current = setTimeout(() => {
                resizeTimer.current = null;
                setBrowserWidth(window.innerWidth);
            }, 200);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize);
        };
    }, [browserWidth]);

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
        <main>
            <section className={["sections", styles.sectionIntro].join(" ")}>
                <div className="backgrounds" id="introBg">
                    {browserWidth < 500 ?
                    <Slider {...carousel_settings}>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/home_bg0.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/vertical/home_bg1.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox} id={styles.resizeBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/vertical/home_bg2.jpg"}
                                    alt="온어스메인"
                                    id={styles.resizeImg}
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/vertical/home_bg4.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                    </Slider>
                    :
                    <Slider {...carousel_settings}>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/home_bg0.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/home_bg1.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/home_bg2.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/home_bg3.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                        <div className={styles.carouselItem}>
                            <div className={styles.introBgBox}>
                                <img
                                    src={process.env.PUBLIC_URL + "/imgs/home/home_bg4.jpg"}
                                    alt="온어스메인"
                                    className={styles.introBgImg}/>
                            </div>
                        </div>
                    </Slider>
                    }
                </div>
                <div className={styles.introContainer}>
                    <div className={styles.introMsg}>
                        <p className={styles.introMsgContent}>
                            지역에 점을 찍고 연결하는 사람들
                        </p>
                        <p className={styles.introMsgContent}>
                            사회적협동조합 온어스
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
