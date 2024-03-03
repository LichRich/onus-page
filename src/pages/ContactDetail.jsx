import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from '../css/contact/Contact.module.css';

export default function ContactDetail({db}) {

    let location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const keyword = params.get('id');

    let navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");

    const contactRef = doc(db, "contact", keyword);

    useEffect(() => {
        const getContact = async () => {
            const docSnapshot = await getDoc(contactRef);
            setName(docSnapshot.data().name);
            setDate(docSnapshot.data().date);
            setCategory(docSnapshot.data().category);
            setContent(docSnapshot.data().content);
            setPhone(docSnapshot.data().phone);
            setCompany(docSnapshot.data().company);
            setEmail(docSnapshot.data().email);
        }
        getContact();
    }, [])

    const deleteHandler = async () => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            await deleteDoc(doc(db, "article", keyword));
            navigate("/contact");
        }
    }

  return (
    <main>
        <section
            className={["sections", styles
                .contactSection]
                .join(' ')}>
            <div className={styles.contactContainer}>
                <div className={styles.titleBox}>
                    <div className={styles.titleBg}></div>
                    <p className={styles.title}>CONTACT</p>
                </div>
                <div className={styles.outerBox}>
                    <div className={styles.innerBox}>
                        <div className={styles.contentTitleBox}>
                            <p className={styles.contentTitle}>문의 유형</p>
                        </div>
                        <div
                            className={[styles.contentBox, styles
                                .categoryBox]
                                .join(' ')}>
                            <p className={styles.category}>{category}</p>
                        </div>
                    </div>
                    <div className={styles.innerBox}>
                        <div className={styles.contentTitleBox}>
                            <p className={styles.contentTitle}>기본 정보</p>
                        </div>
                        <div
                            className={[styles.contentBox, styles
                                .infoBox]
                                .join(' ')}>
                            <div className={styles.infoItems}>
                                <label htmlFor='infoName'>이름</label>
                                <input type='text' name='name' id='infoName' value={name} className={[styles.infoInput, styles.detailInfoName].join(' ')} readOnly/>
                            </div>
                            <div className={styles.infoItems}>
                                <label htmlFor='infoPhone'>연락처</label>
                                <input type='text' name='phone' id='infoPhone' value={phone} className={styles.infoInput} readOnly/>
                            </div>
                            <div className={styles.infoItems}>
                                <label htmlFor='infoCompany'>회사명</label>
                                <input type='text' name='company' id='infoCompany' className={styles.infoInput} value={company} readOnly/>
                            </div>
                            <div className={styles.infoItems}>
                                <label htmlFor='infoEmail'>이메일</label>
                                <input type='text' name='email' id='infoEmail' value={email} className={styles.infoInput} readOnly/>
                            </div>

                        </div>
                    </div>
                    <div className={styles.innerBox}>
                        <div className={styles.contentTitleBox}>
                            <p className={styles.contentTitle}>문의 내용</p>
                        </div>
                        <div
                            className={[styles.contentBox, styles
                                .typingBox]
                                .join(' ')}>
                            <textarea id={styles.textArea} name='content' rows={5} value={content} readOnly>{content}</textarea>
                        </div>
                    </div>
                    <div className={styles.btnBox}>
                        <button className={styles.btnDelete} onClick={() => deleteHandler()}>
                            지우기
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
