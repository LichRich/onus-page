import React from 'react'

export default function Comming() {
  return (
    <main>
        <section className='sections commingSection'>
            <div className='commingContainer'>
                <div className='backgrounds commingBgBox'>
                    <img src={process.env.PUBLIC_URL + "/imgs/comming/bg.jpg"} className='commingBg' />
                </div>
                <p className='commingTitle'>4월, COMMING SOON!</p>
            </div>
        </section>
    </main>
  )
}
