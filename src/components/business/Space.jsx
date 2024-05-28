import React, {useEffect, useRef, useState} from "react";

import SpaceCard from "./SpaceCard";
import styles from '../../css/business/Space.module.css';

import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Space({db, setter, bw}) {

    const [datas, setDatas] = useState([]);
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const resizeTimer = useRef(null);

    const yRef = useRef();
    const yArrSetter = (el) => {
        const y = yRef.current.offsetTop;
        let v = y+el-20;
        setter(v);
    }

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
    <section ref={yRef} className={["sections", styles.spaceSection].join(" ")}>
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
                        isRight={idx%2}
                        setter={yArrSetter}
                        bw={bw} /> :
                    <SpaceCard
                        key={idx}
                        name={data.name}
                        desc={data.desc}
                        addr=""
                        contents={data.contents}
                        imgs={data.imgs}
                        isRight={idx%2}
                        setter={yArrSetter}
                        bw={bw} /> 

                )
            })}
        </div>
    </section>
  )
}
