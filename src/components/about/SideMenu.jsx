import React from 'react'
import { Link } from 'react-scroll';
import { useState } from 'react';

export default function SideMenu({now, handler}) {

    const [sideItem, setSideItems] = useState([
        {
            name: "intro",
            address: "#intro",
            text: "INTRODUCE"
        },
        {
            name: "identity",
            address: "#identity",
            text: "IDENTITY"
        },
        {
            name: "history",
            address: "#history",
            text: "HISTORY"
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
