import React, { useEffect, useRef, useState } from 'react'
import SideMenu from '../components/about/SideMenu'
import Intro from '../components/about/Intro'
import Identity from '../components/about/Identity'
import History from '../components/about/History'

export default function About({db}) {

  const [focused, setFocused] = useState("intro");
  const [prevScrollTop, setPrevScrollTop] = useState(window.scrollY);
  const [idenY, setIdenY] = useState(999);
  const [hisY, setHisY] = useState(999);

  const idenYSetter = (el) => {
    setIdenY(el);
  }
  const hisYSetter = (el) => {
    setHisY(el);
  }

  useEffect(() => {
      const scrollHandler = () => {
          const scrollV = window.scrollY;

          if(scrollV >= hisY-150) {
            setFocused("history");
          } else if(scrollV >= idenY-100) {
            setFocused("identity");
          } else {
            setFocused("intro");
          }

          setPrevScrollTop(scrollV);
      }
      window.addEventListener("scroll", scrollHandler);
      return () => {
          window.removeEventListener("scroll", scrollHandler);
      };
  }, [prevScrollTop]);

  const onClickHandler = (el) => {
    setFocused(el);
  }

  return (
    <main>
      <SideMenu handler={onClickHandler} now={focused}/>
      <Intro />
      <Identity setter={idenYSetter} />
      <History db={db} setter={hisYSetter} />
    </main>
  )
}
