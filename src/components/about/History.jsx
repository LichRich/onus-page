import React, { useEffect, useRef, useState } from 'react'

import styles from '../../css/about/History.module.css';
import { collection, getDocs, orderBy, query, startAt } from 'firebase/firestore';

export default function History({db, setter}) {

  const [list, setList] = useState([]);

  const historyRef = collection(db, "history");

  useEffect(() => {
    const fetchData = async () => {
      const histories = query(historyRef, orderBy("hIdx"));
      const documentSnapshots = await getDocs(histories);
      setList(documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })));
    }
    fetchData();
  }, [])


    const yRef = useRef();
    useEffect(() => {
      const y = yRef.current.offsetTop;
        setter(y);
    }, [])

  return (
    <section className={['sections', styles.historySection].join(' ')} id='history' ref={yRef}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.title}>HISTORY</p>
        </div>
        <div className={styles.right}>
          {
            list.map((item, idx) => {
              return (
                <div key={idx} className={styles.historyItems}>
                  <div className={styles.dateBox}>
                    <p className={styles.date}>{item.date}</p>
                  </div>
                  <div className={styles.contentsBox}>
                    <p className={styles.contents}>{item.contents}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
