import React from 'react'

import styles from '../../css/contact/Table.module.css';
import { useNavigate } from 'react-router-dom';

export default function Table({data}) {

    let navigate = useNavigate();

    const goDetail = (id) => {
        navigate("/contactDetail?id="+id)
    }

    const getData = () => {
        return (
            data.map((item) => {
                return (
                    <tr key={item.id} className={styles.tableRow} onClick={() => {goDetail(item.id)}}>
                        <td className={[styles.tableData, styles.category].join(' ')}>{item.category}</td>
                        <td className={[styles.tableData, styles.name].join(' ')}>{item.name}</td>
                        <td className={[styles.tableData, styles.email].join(' ')}>{item.email}</td>
                        <td className={[styles.tableData, styles.content].join(' ')}>
                            {item.content}
                        </td>
                    </tr>
                );
            })
        );
    }

  return (
    <table className={styles.table}>
        <thead className={styles.tableHead}>
            <tr>
                <th className={styles.idxCategory}>카테고리</th>
                <th className={styles.idxName}>이름</th>
                <th className={styles.idxEmail}>이메일</th>
                <th className={styles.idxContent}>내용</th>
            </tr>
        </thead>
        <tbody className={styles.tableBody}>
            <tr>
                <td className={styles.blank}></td>
                <td className={styles.blank}></td>
                <td className={styles.blank}></td>
                <td className={styles.blank}></td>
            </tr>
            {getData()}
        </tbody>
    </table>
  )
}
