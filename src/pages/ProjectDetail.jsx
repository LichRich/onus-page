import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
  const [imgs, setImgs] = useState([]);
  const [pIdx, setPIdx] = useState(0);

  const projectRef = doc(db, "project", keyword);

  useEffect(() => {
    const getProject = async () => {
      const docSnapshot = await getDoc(projectRef);
      setTitle(docSnapshot.data().title);
      setContent(docSnapshot.data().contents);
      setImgs(docSnapshot.data().imgs);
      setPIdx(docSnapshot.data().projectIdx);
    };
    getProject();
  })

  const navigate = useNavigate();
  const goModify = (id) => {
    navigate("/edit?dir=project&id="+id);
  }

  const deleteHandler = async () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      const listRef = ref(storage, "project/" + pIdx + "/");
      listAll(listRef).then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef).then(() => {
            
          }).catch((e) => {
            console.error(e.message);
          })
        })
      })
      await deleteDoc(doc(db, "project", keyword));
      navigate("/project");
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
    <section className={styles.detailSection}>
        <div className='containers'>
            <div className={styles.titleBox}>
                <p className={styles.title}>
                    {title}
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
            {showBtn()}
        </div>
    </section>
  )
}
