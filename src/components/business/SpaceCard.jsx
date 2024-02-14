import React from 'react'
import Slider from "react-slick";

import styles from '../../css/business/SpaceCard.module.css';

export default function SpaceCard({name, addr, desc, contents, imgs, isLeft}) {

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
    <div className={styles.spaceCard}>
        <div className={styles.spaceLeft}>
            {
            isLeft ? 
            <div className={styles.imgBox}>
                <Slider {...carousel_settings}>
                    {imgs.map((img) => {
                        return (
                            <div className={styles.carouselItem}>
                                <img src={img} alt='공간운영' className={styles.spaceImg} />
                            </div>
                        )
                    })}
                </Slider>
            </div>
            :
            <div className={styles.contents}>
                <div className={styles.nameBox}>
                    <span className={styles.desc}>{desc}</span>
                    <span className={styles.name}>{name}</span>
                </div>
                <div className={styles.contentsBox}>
                    <p className={styles.addr}>{addr}</p>
                    <p className={styles.contents}>{contents}</p>
                </div>
            </div>
        }
        </div>
        <div className={styles.spaceRight}>
            {
            isLeft ? 
            <div className={styles.contents}>
                <div className={styles.nameBox}>
                    <span className={styles.desc}>{desc}</span>
                    <span className={styles.name}>{name}</span>
                </div>
                <div className={styles.contentsBox}>
                    <p className={styles.addr}>{addr}</p>
                    <p className={styles.contents}>{contents}</p>
                </div>
            </div>
            :
            <div className={styles.imgBox}>
                <Slider {...carousel_settings}>
                    {imgs.map((img) => {
                        return (
                            <div className={styles.carouselItem}>
                                <img src={img} alt='공간운영' className={styles.spaceImg} />
                            </div>
                        )
                    })}
                </Slider>
            </div>
        }
        </div>
    </div>
  )
}
