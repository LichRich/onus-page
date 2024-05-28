import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

import ArticleCard from "../components/article/ArticleCard";

import styles from '../css/article/Article.module.css';
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Article({db, isLoggedIn}) {

    const [currentTab, setCurrentTab] = useState(0);
    const [datas, setDatas] = useState([]);
    const [postData, setPostData] = useState([]);

    // firebase db 내 articleRef
    const articleRef = collection(db, 'article');

    useEffect(() => {
        const getItems = async () => {
            // articleRef에서 문서들 가져오기 
            const q = query(articleRef, orderBy("date", "desc"));
            const documentSnapshots = await getDocs(q);
            setDatas(documentSnapshots.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        };
        getItems();
    }, []);

    const menuTab = ['전체', '기사', '유튜브'];

    let navigate = useNavigate();

    useEffect(() => {
        setPostData(datas);
    }, [datas]);

    useEffect(() => {
        setPostData(datas);
        if (currentTab === 1) {
            setPostData(datas.filter((data) => {
                return data.category === 'news'
            }));
        } else if (currentTab === 2) {
            setPostData(datas.filter((data) => {
                return data.category === 'youtube'
            }));
        }
    }, [currentTab]);

    const activeMenuHandler = (idx) => {
        setCurrentTab(idx);
    };

    const goArticleDetail = (d) => {
        navigate("/articleDetail?id="+d);
    }

    const showBtn = () => {
        if(isLoggedIn) {
            return(
                <button className={styles.editBtn} onClick={() => goEdit()}>글쓰기</button>
            )
        }
        return null;
    }

    const goEdit = () => {
        navigate("/edit?dir=article");
    }

  return (
    <main>
        <section className={["sections", styles
            .articleSection]
            .join(" ")}>
            <div className={styles.articleContainer}>
                <div className={styles.titleBox}>
                    <p className={styles.title}>ARTICLE</p>
                </div>
                {showBtn()}
                <div className={styles.tabMenuBox}>
                    <ul className={styles.tabMenuList}>
                        {
                            menuTab.map((el, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className={`${idx === currentTab
                                            ? styles.activeMenuItem
                                            : styles.menuItem}`}
                                        onClick={() => activeMenuHandler(idx)}>
                                        {el}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.tabContentBox}>
                    <div className={styles.cardList}>
                        {
                            postData.map((data, idx) => {
                                return (
                                    <ArticleCard
                                        key={idx}
                                        thumbnail={data.thumbnail}
                                        title={data.title}
                                        date={data.date}
                                        category={data.category}
                                        handler={() => goArticleDetail(data.id)} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
