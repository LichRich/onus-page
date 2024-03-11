import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Slider from "react-slick";

import styles from '../css/project/Detail.module.css';
import { storage } from '../FirebaseConfig';
import { deleteObject, listAll, ref } from 'firebase/storage';

export default function ProjectDetail({db, isLoggedIn}) {

  let location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const keyword = params.get('id');

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [imgs, setImgs] = useState([]);
  const [pIdx, setPIdx] = useState("");

  const projectRef = doc(db, "project", keyword);
  
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
    className: styles.projectSlide,
    arrows: false
  };

  useEffect(() => {
    const getProject = async () => {
      const docSnapshot = await getDoc(projectRef);
      setTitle(docSnapshot.data().title);
      setContent(docSnapshot.data().contents);
      setThumbnail(docSnapshot.data().thumbnail);
      setImgs(docSnapshot.data().imgs);
      setPIdx(docSnapshot.id);
    };
    getProject();
  }, [])

  const navigate = useNavigate();
  const goModify = (id) => {
    navigate("/edit?dir=project&id="+id);
  }

  const deleteHandler = async () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      const thumbnailRef = ref(storage, "project/" + pIdx + "/");
      const imgsRef = ref(storage, "project/"+pIdx+"/imgs/");
      listAll(thumbnailRef).then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef).then(() => {
            
          }).catch((e) => {
            console.error(e.message);
          })
        })
      });
      listAll(imgsRef).then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef).then(() => {}).catch((e)=>{console.error(e.message);})
        })
      });
      await deleteDoc(doc(db, "project", keyword));
      navigate("/project");
    }
  }

  const showSlide = () => {
    if(imgs !== undefined) {
      if(imgs.length < 2) {
        return (
          <div className={styles.imgBox}>
            <div className={styles.flexBox}>
              <div className={styles.carouselItem}>
                  <img src={imgs[0]} alt='프로젝트' className={styles.projectImg} />
              </div>
            </div>
          </div>
        )
      }
      else if(imgs.length < 3) {
        return (
          <div className={styles.imgBox}>
            <div className={styles.flexBox}>
              <div className={styles.carouselItem}>
                  <img src={imgs[0]} alt='프로젝트' className={styles.projectImg} />
              </div>
            </div>
            <div className={styles.flexBox}>
              <div className={styles.carouselItem}>
                  <img src={imgs[1]} alt='프로젝트' className={styles.projectImg} />
              </div>
            </div>
          </div>
        )
      } else {
        const center = imgs.length / 2;
        const firstArr = imgs.slice(0,center);
        const secondArr = imgs.slice(center);

        return (
          <div className={styles.imgBox}>
            <Slider {...carousel_settings}>
                {firstArr.map((img, idx) => {
                    return (
                        <div className={styles.carouselItem}>
                            <img key={idx} src={img} alt='프로젝트' className={styles.projectImg} />
                        </div>
                    )
                })}
            </Slider>
            <Slider {...carousel_settings}>
                {secondArr.map((img, idx) => {
                    return (
                        <div className={styles.carouselItem}>
                            <img key={idx} src={img} alt='프로젝트' className={styles.projectImg} />
                        </div>
                    )
                })}
            </Slider>
          </div>
        )
      }
    }
  }

  const showBtn = () => {
    if(isLoggedIn) {
      return (
        <div className={styles.btnBox}>
            <button className={styles.modify} onClick={() => goModify(keyword)}>수정</button>
            <button className={styles.delete} onClick={() => deleteHandler()}>삭제</button>
        </div>
      )
    }
  }

  return (
    <section className={["sections", styles.detailSection].join(' ')}>
        <div className='containers'>
            <div className={styles.titleBox}>
                <p className={styles.title}>
                    {title}
                </p>
            </div>
            <div className={styles.contentsBox}>
                <div className={styles.thumbnailBox}>
                    <img src={thumbnail} alt="article img" className={styles.thumbnail} />
                </div>
                <div className={styles.contents} dangerouslySetInnerHTML={{__html: content}}></div>
                {showSlide()}
            </div>
            {showBtn()}
        </div>
    </section>
  )
}
