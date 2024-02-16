import React, {useEffect, useState} from "react";

import SpaceCard from "./SpaceCard";
import styles from '../../css/business/Space.module.css';

import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Space({db}) {

    const [datas, setDatas] = useState([]);

    // firebase db 내 spaceRef
    const spaceRef = collection(db, 'space');

    useEffect(() => {
        const getItems = async () => {
            // spaceRef에서 문서들 가져오기 
            const q = query(spaceRef, orderBy("spaceIdx", "asc"));
            const documentSnapshots = await getDocs(q);
            setDatas(documentSnapshots.docs.map((doc) => ({
                ...doc.data()
            })))
        };
        getItems();
    }, []);

  return (
    <section className={["sections", styles.spaceSection].join(" ")}>
        <div className={styles.contentsList}>
            {datas.map((data, idx) => {
                return (
                    data.addr ? 
                    <SpaceCard
                        key={idx}
                        name={data.name}
                        desc={data.desc}
                        addr={data.addr}
                        contents={data.contents}
                        imgs={data.imgs}
                        isRight={idx%2} /> :
                    <SpaceCard
                        key={idx}
                        name={data.name}
                        desc={data.desc}
                        addr=""
                        contents={data.contents}
                        imgs={data.imgs}
                        isRight={idx%2} /> 

                )
            })}
        </div>
    </section>
  )
}
