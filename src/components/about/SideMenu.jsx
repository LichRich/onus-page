import React from 'react'

export default function SideMenu() {

    const [sideItem, setSideItems] = useState([
        {
            name: "onus",
            address: "/about",
            text: "온어스 소개"
        },
        {
            name: "identity",
            address: "/identity",
            text: "아이덴티티"
        },
        {
            name: "history",
            address: "/history",
            text: "연보"
        },
    ])

  return (
    <nav className='sideNav' id='side-nav'>
        <div className='sideNavBox'>
            {sideItem.map((item) => {
                return (
                    <Link to={item.address} className={["side-item", ["side-item", item.name].join("-")].join(" ")}>{item.text}</Link>
                )
            })}
        </div>
    </nav>
  )
}
