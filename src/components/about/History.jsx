import React, { useEffect, useRef } from 'react'

export default function History({db, setter}) {

    const yRef = useRef();
    useEffect(() => {
      const y = yRef.current.offsetTop;
        setter(y);
    }, [])

  return (
    <section className='sections' id='history' ref={yRef}></section>
  )
}
