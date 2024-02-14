import React from 'react'
import styles from '../../css/business/LocalCard.module.css';
import Slider from 'react-slick';

export default function LocalCard({name, contents, imgs}) {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 0,
        arrows: false,
        pauseOnHover: true,
        cssEase: "linear",
    };

  return (
    <div className={styles.localCard}>
        <div className={styles.nameBox}>
            <div className={styles.nameBg}></div>
            <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.contentsBox}>
            <p className={styles.contents}>{contents}</p>
        </div>
        <div className={styles.imgListBox}>
            <Slider {...settings}>
                {imgs.map((img) => {
                    return (
                        <div className={styles.imgBox}>
                            <img src={img} alt='지역콘텐츠' className={styles.localImg} />
                        </div>
                    )
                })}
            </Slider>
        </div>
    </div>
  )
}
