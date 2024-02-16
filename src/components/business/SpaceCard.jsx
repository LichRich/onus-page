import React from 'react'
import Slider from "react-slick";

import styles from '../../css/business/SpaceCard.module.css';

export default function SpaceCard({name, addr, desc, contents, imgs, isRight}) {

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
        className: styles.sangsaSlide,
        arrows: false
    };

  return (
        !isRight ?
        <div className={styles.spaceCard}>
            <div className={styles.spaceImgBox}>
                <div className={styles.imgBox}>
                    <Slider {...carousel_settings}>
                        {imgs.map((img, idx) => {
                            return (
                                <div className={styles.carouselItem}>
                                    <img key={idx} src={img} alt='공간운영' className={styles.spaceImg} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            <div className={styles.spaceContentBox}>
                <div className={styles.outerBox}>
                    <div className={styles.nameBox}>
                        <span className={styles.desc}>{desc}</span>
                        <span className={styles.name}>'{name}'</span>
                    </div>
                    <div className={styles.contentsBox}>
                        <p className={styles.addr}>{addr}</p>
                        <p className={styles.contents}>{contents}</p>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className={styles.spaceCard}>
            <div className={styles.spaceContentBox}>
                <div className={styles.outerBox}>
                    <div className={[styles.nameBox, styles.right].join(' ')}>
                        <span className={styles.desc}>{desc}</span>
                        <span className={styles.name}>{name}</span>
                    </div>
                    <div className={[styles.contentsBox, styles.right].join(' ')}>
                        <p className={styles.addr}>{addr}</p>
                        <p className={styles.contents}>{contents}</p>
                    </div>
                </div>
            </div>
            <div className={styles.spaceImgBox}>
                <div className={styles.imgBox}>
                    <Slider {...carousel_settings}>
                        {imgs.map((img, idx) => {
                            return (
                                <div key={idx} className={styles.carouselItem}>
                                    <img src={img} alt='공간운영' className={styles.spaceImg} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
  )
}
