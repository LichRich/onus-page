import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { storage } from '../../FirebaseConfig';
// import { getDownloadURL, ref } from 'firebase/storage';

export default function NavItems({itemName, addr, text, menuToggle, isLink}) {

  const cut = addr.substring(0, 5);
  
  // const downloadMagazine = () => {

  //   const url = "https://firebasestorage.googleapis.com/v0/b/onus-page.appspot.com/o/magazine%2F%EB%8F%84%EA%B3%A0%EB%8F%84%EA%B0%90%202022%20-%20DOGO%EC%98%A8%EC%B2%9C.pdf?alt=media&token=5ffef638-06dc-497a-a062-2453e8058617";

  //   fetch(url, {method: 'GET'}).then((res) => {return res.blob();})
  //   .then((blob) => {
  //     const uri = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = uri;
  //     a.download = "도고도감 2022 - DOGO온천.pdf";
  //     document.body.appendChild(a);
  //     a.click();
  //     setTimeout((_) => {
  //       window.URL.revokeObjectURL(uri);
  //     }, 60000);
  //     a.remove();
  //   })
  //   .catch((err) => {
  //     console.error("error: ", err);
  //   })

  // }

  const showLinks = (addr, itemName, text) => {
    if(cut === "https") {
      return (
        <Link to={addr} target='_blank' className={[
          "link-item",
          ["link-item", itemName]
          .join("-")
          ]
          .join(" ")} onClick={() => menuToggle()}>{text}</Link>
      )
    }
    return (
      <Link to={addr} className={[
        "link-item",
        ["link-item", itemName]
        .join("-")
        ]
        .join(" ")} onClick={() => menuToggle()}>{text}</Link>
    )
  }
  
  return (
    <>
        {
          isLink ? 
            showLinks(addr, itemName, text)
            :
            <Link to={addr} className={[
              "menu-item",
              ["menu-item", itemName]
              .join("-")
              ]
              .join(" ")} onClick={() => menuToggle()}>{text}</Link>
        }
    </>
  )
}
