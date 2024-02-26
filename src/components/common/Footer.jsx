import React from 'react'

export default function Footer({isLoggedIn, handler}) {

  return (
      <div className='footer'>
          <div className='footer-left'>
            <div className='footer-name-box'>
              <p className='footer-name'>사회적협동조합 온어스</p>
            </div>
            <div className='footer-copy-box'>
              <p className='footer-copy'>&copy; &nbsp;ONUS, All Rights Reserved</p>
            </div>
          </div>
          <div className='footer-center'>
            <p className='footer-addr'>주소: 충청남도 아산시 도고면 아산만로 214</p>
            <p className='footer-phone'>전화: 041-545-0128<span>메일: cooponus@naver.com</span></p>
          </div>
          <div className='footer-sns'>
            <a href='https://www.instagram.com/0nus_on_us/' target='_blank'>
              <img src={process.env.PUBLIC_URL + '/imgs/icons/icon_insta.jpg'} alt='sns icon'/>
              {/* <img src={"https://lichrich.github.io/onus-page" + '/imgs/icons/icon_insta.jpg'} alt='sns icon'/> */}
            </a>
            <a href='https://www.facebook.com/coop.onus' target='_blank'>
              <img src={process.env.PUBLIC_URL + '/imgs/icons/icon_facebook.png'} alt='sns icon'/>
              {/* <img src={"https://lichrich.github.io/onus-page" + '/imgs/icons/icon_facebook.png'} alt='sns icon'/> */}
            </a>
            <a href='https://www.youtube.com/@onair7714/featured' target='_blank'>
              {/* <img src={"https://lichrich.github.io/onus-page" + '/imgs/icons/icon_youtube.jpg'} alt='sns icon'/> */}
              <img src={process.env.PUBLIC_URL + '/imgs/icons/icon_youtube.jpg'} alt='sns icon'/>
            </a>
          </div>
          <div className='footer-logo-box'>
            {/* <img className="footer-logo" src={"https://lichrich.github.io/onus-page" + '/imgs/onus_logo.png'} alt='logo' /> */}
            { isLoggedIn ? 
              <img className="footer-logo" src={process.env.PUBLIC_URL + '/imgs/onus_logo.png'} alt='logo' style={{cursor:"pointer"}} onClick={handler} />
              :
              <img className="footer-logo" src={process.env.PUBLIC_URL + '/imgs/onus_logo.png'} alt='logo' />
            }
          </div>
      </div>
  )
}
