import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from '../css/business/Business.module.css';
import Space from '../components/business/Space';
import LocalContents from '../components/business/LocalContents';

export default function Business({db}) {

  const [currentTab, setCurrentTab] = useState(0);
  const [spaceY, setSpaceY] = useState([]);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const resizeTimer = useRef(null);
  let arr = [];

  const menuTab = ['공간운영', '지역 콘텐츠 개발'];

  const activeMenuHandler = (idx) => {
    setCurrentTab(idx);
  };

  const spaceYSetter = (el) => {
    arr = [...arr, el]
    setSpaceY(arr);
  }
  const mainRef = useRef();

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

  const wheelHandler = useCallback((e) => {
    e.preventDefault();
    const {deltaY} = e;
    const {scrollTop} = mainRef.current;
    const pageHeight = window.innerHeight;

    if(deltaY > 0) {
      if(scrollTop < spaceY[0]-1) {
        mainRef.current.scrollTo({
          top: spaceY[0],
          left: 0,
          behavior: "smooth",
        });
      } else if(scrollTop < spaceY[1]-1) {
        mainRef.current.scrollTo({
          top: spaceY[1],
          left: 0,
          behavior: "smooth",
        });
      } else if(scrollTop < spaceY[2]-1) {
        mainRef.current.scrollTo({
          top: spaceY[2],
          left: 0,
          behavior: "smooth",
        });
      } else if(scrollTop < spaceY[3]-1) {
        mainRef.current.scrollTo({
          top: spaceY[3],
          left: 0,
          behavior: "smooth",
        });
      } 
    } else {
      if(scrollTop > spaceY[2]) {
        mainRef.current.scrollTo({
          top: spaceY[2],
          left: 0,
          behavior: "smooth",
        });
      } else if(scrollTop > spaceY[1]) {
        mainRef.current.scrollTo({
          top: spaceY[1],
          left: 0,
          behavior: "smooth",
        });
      } else if(scrollTop > spaceY[0]) {
        mainRef.current.scrollTo({
          top: spaceY[0],
          left: 0,
          behavior: "smooth",
        });
      } else {
        mainRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  });

  useEffect(() => {
    const mainRefCurr = mainRef.current;
    mainRefCurr.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if(browserWidth > 1500 && currentTab == 0) {
      mainRefCurr.addEventListener("wheel", wheelHandler);
      mainRefCurr.style.setProperty('height', '100vh');
      return () => {
        mainRefCurr.removeEventListener("wheel", wheelHandler);
      };
    } else {
      mainRefCurr.removeEventListener("wheel", wheelHandler);
      mainRefCurr.style.setProperty('height', 'fit-content');
      return () => {
        mainRefCurr.removeEventListener("wheel", wheelHandler);
      };
    }
  }, [currentTab, arr, browserWidth]);

  return (
    <main ref={mainRef} className={styles.main}>
      <div className={styles.titleBox}>
        <p className={styles.title}>BUSINESS</p>
      </div>
      <div className={styles.tabMenuBox}>
        <ul className={styles.tabMenuList}>
          {
            menuTab.map((el, idx) => {
              return (
                <li
                  key={idx}
                  className={
                    `${idx === currentTab ?
                    styles.activeMenuItem :
                    styles.menuItem}`
                  } onClick={() => activeMenuHandler(idx)}>
                  {el}
                </li>
              )
            })
          }
        </ul>
      </div>
      {currentTab == 0 ? <Space bw={browserWidth} setter={spaceYSetter} db={db} /> : <LocalContents db={db} />}
    </main>
  )
}
