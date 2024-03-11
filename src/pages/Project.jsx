import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    orderBy,
    query,
    getCountFromServer
} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

import styles from '../css/project/Project.module.css';
import ProjectCard from "../components/project/ProjectCard";

export default function Project({db, isLoggedIn}) {

    const ITEM_LIMIT = 8;

    const [list, setList] = useState([]);
    const [pages, setPages] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [len, setLen] = useState(0);
    const [docSnapshots, setDocSnapshots] = useState();

    const projectRef = collection(db, "project");

    const navigate = useNavigate();

    useEffect(() => {
        const getCLength = async () => {
            const lengthSnapshot = await getCountFromServer(projectRef);
            setLen(lengthSnapshot.data().count);
            setPagesCnt();
        }
        getCLength();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const projects = query(projectRef, orderBy("id", "asc"));
            const documentSnapshots = await getDocs(projects);
            setList(documentSnapshots.docs.map((doc) => ({id: doc.id, ...doc.data()})));
        }
        fetchData();
    }, []);

    const setPagesCnt = () => {
        if(len === 0) {
            setPages(0);
        } else if(len%ITEM_LIMIT === 0) {
            setPages(parseInt(len/ITEM_LIMIT));
        } else {
            setPages(parseInt(len/ITEM_LIMIT) + 1);
        }
    }

    const getCards = () => {
        
        if(list.length > 0) {
            return (
                <ProjectCard data={list} />
            );
        } else {
            return (
                <div className="noPosts">등록된 게시글이 없습니다.</div>
            );
        }
    }

    const goEdit = () => {
        navigate("/edit?dir=project");
    }

    const showBtn = () => {
        if(isLoggedIn) {
            return(
                <button className={styles.editBtn} onClick={() => goEdit()}>글쓰기</button>
            )
        }
        return null;
    }

  return (
    <section className={["sections",styles.projectSection].join(" ")}>
        <div className={styles.container}>
            <div className={styles.titleBox}>
                <div className={styles.titleBg}></div>
                <p className={styles.title}>PROJECT</p>
            </div>
            {showBtn()}
            <div className={styles.contentsList}>
                {getCards()}
            </div>
        </div>
    </section>
  )
}
