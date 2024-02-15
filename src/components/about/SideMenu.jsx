import React from 'react'
import { Link } from 'react-scroll';
import { useState } from 'react';

export default function SideMenu({now, handler}) {

    const [sideItem, setSideItems] = useState([
        {
            name: "intro",
            address: "#intro",
            text: "온어스 소개"
        },
        {
            name: "identity",
            address: "#identity",
            text: "아이덴티티"
        },
        {
            name: "history",
            address: "#history",
            text: "연보"
        },
    ])

  return (
    <nav className='sideNav' id='side-nav'>
        <div className='sideNavBox'>
            {sideItem.map((item) => {
                return (
                    <Link key={item.name} to={item.name} spy={true} smooth={false} className={now === item.name ? "side-item side-item-focused" : "side-item"} onClick={() => handler(item.name)}>{item.text}</Link>
                )
            })}
        </div>
    </nav>
  )
}
