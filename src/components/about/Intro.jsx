import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick";

import styles from '../../css/about/Intro.module.css';

const Intro = () => {

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
        pauseOnHover : false,
        autoplay: true,
        autoplayspeed: 500,
        arrows: false,
    };
    const bg_settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        fade: true,
        draggable: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover : false,
        autoplay: true,
        autoplayspeed: 1000,
        arrows: false,
    };

  return (
    <section className={["sections", styles.introSection].join(' ')} id="intro">
        <div className="backgrounds" id="introBg">
            {browserWidth < 500 ?
            <Slider {...bg_settings}>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg0.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/vertical/about_bg1.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg2.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox} id={styles.resizeBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/vertical/about_bg3.jpg"} id={styles.resizeImg} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg4.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
            </Slider>
            :
            <Slider {...bg_settings}>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg0.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg1.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg2.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg3.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <div className={styles.introBgBox}>
                        <img src={process.env.PUBLIC_URL + "/imgs/about/about_bg4.jpg"} alt="온어스에 대하여" className={styles.introBgImg} />
                    </div>
                </div>
            </Slider>
            }
        </div>
        <div className={["containers", styles.introContainer].join(' ')}>
            <div className={styles.introTitleBox}>
                <h2 className={styles.introTitle}>사회적협동조합 ONUS</h2>
            </div>
            <div className={styles.descBox}>
                <Slider {...carousel_settings}>
                    <div className={styles.carouselItem}>
                        <div className={styles.contentsBox}>
                            <p className={styles.contents}>온어스는 경쟁이 아닌 상생과 협력을 택한 청년기업들이</p>
                            <p className={styles.contents}>지역에서 함께 살아가기 위해 설립한 사회적협동조합 입니다.</p>
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.contentsBox}>
                            <p className={styles.contents}>자주적·자립적·자치적인 조합 활동을 통하여</p>
                            <p className={styles.contents}>청년이 행복한 삶을 누릴 수 있도록 노력하고</p>
                            <p className={styles.contents}>지역과 상생하는 네트워크 구축 및 활성화를 목적으로 한다.</p>
                            <p className={styles.contents}>-정관 제2조 목적-</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    </section>
  )
}

export default Intro;