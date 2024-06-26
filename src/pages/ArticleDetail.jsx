import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../css/article/Detail.module.css'
import { useState } from 'react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore, storage } from '../FirebaseConfig';
import { useEffect } from 'react';
import { deleteObject, listAll, ref } from 'firebase/storage';
import YouTube from 'react-youtube';

export default function ArticleDetail({isLoggedIn}) {

    let location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const keyword = params.get('id');

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [imgs, setImgs] = useState("");
    const [link, setLink] = useState("");
    const [category, setCategory] = useState("");

    const articleRef = doc(firestore, "article", keyword);

    useEffect(() => {
        const getArticle = async () => {
            const docSnapshot = await getDoc(articleRef);
            setTitle(docSnapshot.data().title);
            setCategory(docSnapshot.data().category);
            setContent(docSnapshot.data().contents);
            setDate(docSnapshot.data().date);
            setImgs(docSnapshot.data().thumbnail);
            setLink(docSnapshot.data().link);
        };
        getArticle();
    },[])

    const navigate = useNavigate();
    const goModify = (id) => {
        navigate("/edit?dir=article&id="+id);
    }

    const deleteHandler = async () => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            const listRef = ref(storage, "article/"+keyword+"/");
            listAll(listRef).then((res) => {
                res.items.forEach((itemRef) => {
                    deleteObject(itemRef).then(() => {

                    }).catch((e) => {
                        console.log(e.message);
                    })
                })
            });
            await deleteDoc(doc(firestore, "article", keyword));
            navigate("/article");
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

    const youtubeOpt = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
            rel: 0,
            modestbranding: 1,
        },
    };

    const showYoutube = () => {
        const linkCut = link.split("?")[0];
        const vidId = linkCut.substring(17, linkCut.length);

        console.log(vidId);

        return <YouTube videoId={vidId} opts={youtubeOpt} onEnd={(e) => {e.currentTarget.stopVideo(0);}} />
    }

  return (
    <section className={styles.detailSection}>
        <div className='containers'>
            <div className={styles.titleBox}>
                <p className={styles.title}>
                    {title}
                </p>
            </div>
            <div className={styles.contentsBox}>
                { category !== "youtube" ?
                    <div className={styles.imgBox}>
                        <img src={imgs} alt="article img" className={styles.img} />
                    </div>
                    :
                    showYoutube()
                }
                <div className={styles.contents} dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
            { category === "youtube" ?
                <div className={styles.linkBox}>
                    <p className={styles.link}>출처: {link}</p>
                </div>
                :
                <div className={styles.linkBox}></div>
            }
            {showBtn()}
        </div>
    </section>
  )
}
