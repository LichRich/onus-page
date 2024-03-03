import React, {useEffect, useState} from 'react'

import styles from '../css/contact/Contact.module.css';
import { collection, doc, getCountFromServer, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Table from '../components/contact/Table';

export default function Contact({db, isLoggedIn}) {

    const [category, setCategory] = useState("");
    const categories = ["행사 기획, 운영", "교육, 컨설팅", "사례지 견학", "기타"];

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [content, setContent] = useState("");


    const ITEM_LIMIT = 8;
    const [list, setList] = useState([]);
    const [pages, setPages] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [len, setLen] = useState(0);
    const [docSnapshots, setDocSnapshots] = useState();

    const contactRef = collection(db, "contact");

    let navigate = useNavigate();

    const handleCategory = (e) => {
        setCategory(categories[e.currentTarget.value]);
        console.log(categories[e.currentTarget.value]);
    }

    const handleName = (e) =>{
      setName(e.currentTarget.value);
    }
    const handlePhone = (e) => {
      setPhone(e.currentTarget.value);
    }
    const handleEmail = (e) => {
      setEmail(e.currentTarget.value);
    }
    const handleCompany = (e) => {
      setCompany(e.currentTarget.value);
    }
    const handleContent = (e) => {
      setContent(e.currentTarget.value);
    }

    const uploadDoc = async (e) => {
      e.preventDefault();

      const now = Date.now();
      const postId = "" + now;
      const calcDate = new Date(now);
      const month = calcDate.getMonth() + 1;
      const uploadDate = calcDate.getFullYear() + ". " + month + ". " + calcDate.getDate();

      try {
        const docRef = await setDoc(doc(db, "contact", postId), {
          id: postId,
          category: category,
          name: name,
          phone: phone,
          email: email,
          company: company,
          content: content,
          date: uploadDate
        });
      } catch (error) {
        console.error("Error adding doc: ", error);
      } finally {
        window.alert("문의가 접수되었습니다.");
        navigate("/");
      }
    }

    useEffect(() => {
      const getContentsLength = async () => {
        const lengthSnapshot = await getCountFromServer(contactRef);
        setLen(lengthSnapshot.data().count);
        setPageCnt();
      }
      getContentsLength();
    }, [len]);

    useEffect(() => {
      const fetchData = async () => {
        const contacts = query(contactRef, orderBy("date", "asc"));
        setDocSnapshots(await getDocs(contacts));
      }
      fetchData();
    }, []);

    useEffect(() => {
      const setItemList = () => {
        if(docSnapshots !== undefined) {
          setList(docSnapshots.docs.map((doc) => ({
            key: doc.id,
            ...doc.data()
          })));
        }
      }
      setItemList();
    }, [docSnapshots]);

    const setPageCnt = () => {
      if(len === 0) {
        setPages(0);
      } else if(len%ITEM_LIMIT === 0) {
        setPages(parseInt(len/ITEM_LIMIT));
      } else {
        setPages(parseInt(len/ITEM_LIMIT) + 1);
      }
    }

    const getTable = () => {
      if(list.length > 0) {
        return (
          <Table data={list} />
        );
      } else {
        return (
          <div className={styles.noPosts}>문의 내역이 없습니다.</div>
        )
      }
    }

    const currPageHandler = (page) => {
      setCurrPage(page);
    }

    const showList = () => {
        return (
        <div className={styles.outerBox}>
          {getTable()}
        </div>
        )
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
                    {
                      isLoggedIn ?
                      showList() :
                      <form className={styles.outerBox} onSubmit={uploadDoc}>
                          <div className={styles.innerBox}>
                              <div className={styles.contentTitleBox}>
                                  <p className={styles.contentTitle}>문의 유형</p>
                              </div>
                              <div
                                  className={[styles.contentBox, styles
                                      .categoryBox]
                                      .join(' ')}>
                                  <label htmlFor='categoryFirst'>
                                      <input
                                          type="radio"
                                          name="category"
                                          value="0"
                                          id='categoryFirst'
                                          className={styles.radioItem}
                                          onChange={handleCategory} required/>행사 기획, 운영</label>
                                  <label htmlFor='categorySecond'><input
                                      type="radio"
                                      name="category"
                                      value="1"
                                      id='categorySecond'
                                      className={styles.radioItem} onChange={handleCategory} required/>교육, 컨설팅</label>
                                  <label htmlFor='categoryThird'><input
                                      type="radio"
                                      name="category"
                                      value="2"
                                      id='categoryThird'
                                      className={styles.radioItem} onChange={handleCategory} required/>사례지 견학</label>
                                  <label htmlFor='categoryFourth'><input
                                      type="radio"
                                      name="category"
                                      value="3"
                                      id='categoryFourth'
                                      className={styles.radioItem} onChange={handleCategory} required/>기타</label>
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
                                      <label htmlFor='infoName'>이름*</label>
                                      <input type='text' name='name' id='infoName' required className={[styles.infoInput, styles.infoName].join(' ')} onChange={handleName}/>
                                  </div>
                                  <div className={styles.infoItems}>
                                      <label htmlFor='infoPhone'>연락처*</label>
                                      <input type='text' name='phone' id='infoPhone' required className={styles.infoInput} onChange={handlePhone}/>
                                  </div>
                                  <div className={styles.infoItems}>
                                      <label htmlFor='infoCompany'>회사명</label>
                                      <input type='text' name='company' id='infoCompany' className={styles.infoInput} onChange={handleCompany}/>
                                  </div>
                                  <div className={styles.infoItems}>
                                      <label htmlFor='infoEmail'>이메일*</label>
                                      <input type='text' name='email' id='infoEmail' required className={styles.infoInput} onChange={handleEmail}/>
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
                                  <textarea id={styles.textArea} name='content' rows={5} onChange={handleContent} required></textarea>
                              </div>
                          </div>
                          <div className={styles.btnBox}>
                              <button type='submit' className={styles.btnSubmit}>
                                  문의하기
                              </button>
                          </div>
                      </form>
                    }
                </div>
            </section>
        </main>
    )
}
