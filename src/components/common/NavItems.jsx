import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItems({itemName, addr, text, menuToggle}) {
  return (
    <>
        {
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
