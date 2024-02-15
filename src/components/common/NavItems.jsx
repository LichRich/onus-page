import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItems({itemName, addr, text, menuToggle, isLink}) {
  return (
    <>
        {
          isLink ? 
            <Link to={addr} className={[
                "link-item",
                ["link-item", itemName]
                .join("-")
                ]
                .join(" ")} onClick={() => menuToggle()}>{text}</Link>
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
