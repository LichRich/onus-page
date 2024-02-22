import React, {useState, useEffect} from 'react'
import {auth} from '../FirebaseConfig';
import {browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut} from "@firebase/auth";

import styles from '../css/admin/Login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Login({loginHandler}) {

    // admin@onuscoop.com
    const [email, setEmail] = useState("");
    // onusadmin
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});

    let isLoggedIn = false;
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                isLoggedIn = true;
                setUser(currentUser);
            } else {
                isLoggedIn = false;
            }
        })
    }, [])

    const loginFunction = () => {
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            const user = signInWithEmailAndPassword(auth, email, password);

            isLoggedIn = !isLoggedIn;
            if(isLoggedIn) {
                user.then((u) => {
                    loginHandler(u);
                })
            }
            return user;
        })
        .catch((err) => {
            const errorCode = err.code;
            const errMsg = err.message;

            alert("일치하는 사용자를 찾을 수 없습니다.");
            return window.location.reload();
        });
    }

  return (
    <main className="loginContainer">
        <div className={['sections', styles.loginSection].join(" ")}>
            <div className={styles.loginForm}>
                <h3 className={styles.loginTitle}>로그인</h3>
                <div className={styles.emailBox}>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={styles.inputs}
                        placeholder="이메일을 입력하세요"
                        required="required"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.currentTarget.value);
                        }}/>
                </div>
                <div className={styles.pwBox}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.inputs}
                        placeholder="비밀번호를 입력하세요"
                        required="required"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }}/>
                </div>
                <div className={styles.btnBox}>
                    <button id="loginBtn" className={styles.loginBtn} onClick={() => loginFunction()}>login</button>
                </div>
            </div>
        </div>
    </main>
  )
}
