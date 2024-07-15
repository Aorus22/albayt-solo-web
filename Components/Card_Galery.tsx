import Image from 'next/image';
import React from 'react'

type cardProps = {
    foto_id: string;
    img: string;
    title: string;
}

const Card_Galery = ({foto_id, img, title}: cardProps) => {
  return (
    <>
        <div className='flexCenter' key={foto_id}>
            <div className='card_galery'>
                <div className='image_box'>
                    <Image src={img} alt='foto' width={450} height={450} className='The_Image'/>
                    <div className='image_text'>
                        {title}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card_Galery