import React, { useState } from 'react'

export default function Header({menuToggle, menuToggler}) {

    const [menuItems, setMenuItems] = useState([
        {
            name: "about",
            address: "/about",
            text: "ABOUT"
        }, {
            name: "business",
            address: "/business",
            text: "BUSINESS"
        }, {
            name: "project",
            address: "/project",
            text: "PROJECT"
        }, {
            name: "archive",
            address: "/archive",
            text: "ARCIVE"
        }
    ]);

    const [linkItems, setLinkItems] = useState([
        {
            name: "dogam",
            text: "도감 프로젝트"
        },
        {
            name: "magazine",
            text: "도감 매거진"
        }
    ])
  return (
    <nav className='navbar' id='top-navbar'>
        <div className="navbar-logo">
            <Link to="/">
                <img
                    src={process.env.PUBLIC_URL + '/favicons/logo192.png'}
                    alt="logo"
                    id='logo'/>
            </Link>
        </div>
        <div className="menu-box">
            <div
                className={!menuToggle
                    ? "burger__menu"
                    : "x__menu"}
                onClick={() => menuToggler()}>
                <div className="burger_line1"></div>
                <div className="burger_line2"></div>
                <div className="burger_line3"></div>
            </div>
            <div className={["menu-list-box", !menuToggle ? "menu-list-hidden" : "menu-list-visible"].join(" ")}>
                <div className="menu-list">
                    {
                        menuItems.map((item) => {
                            return (
                                <NavItem
                                    itemName={item.name}
                                    addr={item.address}
                                    key={item.name}
                                    text={item.text}
                                    menuToggle={menuToggler}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </nav>
  )
}
