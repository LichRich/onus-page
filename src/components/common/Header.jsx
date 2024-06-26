import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NavItems from './NavItems';

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
            name: "article",
            address: "/article",
            text: "ARTICLE"
        }
    ]);

    const [linkItems, setLinkItems] = useState([
        {
            name: "pickage",
            address: "/pickage",
            text: "픽키지"
        },
        {
            name: "magazine",
            address: "/magazine",
            text: "도감 매거진"
        },
        {
            name: "contact",
            address: "/contact",
            text: "문의하기"
        }
    ])
  return (
    <nav className='navbar' id='top-navbar'>
        <div className='navbarContainer'>
            <div className="navbar-logo">
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + '/imgs/onus_logo.png'}
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
                                    <NavItems
                                        itemName={item.name}
                                        addr={item.address}
                                        key={item.name}
                                        text={item.text}
                                        menuToggle={menuToggler}
                                        isLink={false}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={["link-list-box", !menuToggle ? "link-list-hidden" : "link-list-visible"].join(" ")}>
                    <div className="link-list">
                        {
                            linkItems.map((item) => {
                                return (
                                    <NavItems
                                        itemName={item.name}
                                        addr={item.address}
                                        key={item.name}
                                        text={item.text}
                                        menuToggle={menuToggler}
                                        isLink={true}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}
