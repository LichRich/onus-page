import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../css/article/Detail.module.css'
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../FirebaseConfig';
import { useEffect } from 'react';

export default function ArticleDetail() {

    let location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const keyword = params.get('id');

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [imgs, setImgs] = useState([]);
    const [link, setLink] = useState("");

    const articleRef = doc(firestore, "article", keyword);

    useEffect(() => {
        const getArticle = async () => {
            const docSnapshot = await getDoc(articleRef);
            setTitle(docSnapshot.data().title);
            setContent(docSnapshot.data().contents);
            setDate(docSnapshot.data().date);
            setImgs(docSnapshot.data().imgs);
            setLink(docSnapshot.data().link);
        };
        getArticle();
    },[])

  return (
    <section className={styles.detailSection}>
        <div className='containers'>
            <div className={styles.titleBox}>
                <p className={styles.title}>
                    {title}
                </p>
                <p className={styles.date}>
                    {date}
                </p>
            </div>
            <div className={styles.contentsBox}>
                <div className={styles.imgBox}>
                    {
                        imgs.map((item, idx) => {
                            return (<img key={idx} src={item} alt="article img" className={styles.img} />);
                        })
                    }
                </div>
                <div className={styles.contents} dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
            <div className={styles.linkBox}>
                <p className={styles.link}>출처: {link}</p>
            </div>
        </div>
    </section>
  )
}
