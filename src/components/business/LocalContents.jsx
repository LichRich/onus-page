import React, { useEffect, useState } from 'react'
import styles from '../../css/business/LocalContents.module.css';
import LocalCard from './LocalCard';

import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function LocalContents({db}) {

    const [datas, setDatas] = useState([]);

    // firebase db 내 spaceRef
    const localRef = collection(db, 'localContents');

    useEffect(() => {
        const getItems = async () => {
            // localRef에서 문서들 가져오기 
            const q = query(localRef, orderBy("localIdx", "desc"));
            const documentSnapshots = await getDocs(q);
            setDatas(documentSnapshots.docs.map((doc) => ({
                ...doc.data()
            })))
        };
        getItems();
    }, []);

  return (
    <section className={['sections', styles.localSection].join(" ")}>
        <div className={styles.contentsList}>
            {datas.map((data, idx) => {
                return (
                    <LocalCard
                        key={idx}
                        name={data.name}
                        contents={data.contents}
                        imgs={data.imgs} />
                )
            })}
        </div>
    </section>
  )
}
