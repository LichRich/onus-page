import React from 'react'

import styles from '../../css/project/ProjectCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({data}) {

    const navigate = useNavigate();
    const goProjectDetail = (d) => {
        navigate("/projectDetail?id="+d);
    }

    const getData = () => {
        return (
            data.map((item) => {
                return (
                    <div key={item.title} className={styles.imgBox} onClick={() => goProjectDetail(item.id)}>
                        <img src={item.thumbnail} className={styles.cardThumbnail} alt="프로젝트 이미지" />
                    </div>
                )
            })
        )
    }

  return (
    <div className={styles.projectCards}>
        {getData()}
    </div>
  )
}
