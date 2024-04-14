// @ts-nocheck
'use client'

import React, {useRef} from 'react';
import { BERITA_ARTIKEL } from '@/constants';
import BlogItem from './Card_Berita';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrevArrow = ({ onClick, className }: { onClick: () => void; className: string }) => (
  <div
    className={className}
    style={{ color: 'black', fontSize: '20px' }}
    onClick={onClick}
  />
);

const NextArrow = ({ onClick, className }: { onClick: () => void; className: string }) => (
  <div
    className={className}
    style={{ 
      color: 'black', 
      fontSize: '50px', 
      width:'30px',
      height:'30px',
      backgroundColor: 'black',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    }}
    onClick={onClick}
  />
);

const PreviewArtikel = () => {
    let sliderRef = useRef(null);
    const next = () => {
      sliderRef.slickNext();
    };
    const previous = () => {
      sliderRef.slickPrev();
    };
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed:5000,
        slidesToShow: 3, 
        slidesToScroll: 3,
        arrows:false, 
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

  return (
    <>
        <div className='max-container padding-container mx-auto mb-16 py-8 px-8'>

            <div className='items-center text-center my-7'>
                <h1 className='font-medium text-5xl text-[#3C3633]'>
                    BERITA <span className='font-bold text-[#f14310]'>TERKINI</span>
                </h1>
            </div>

            <div className="slider-container relative">
                <Slider {...settings} ref={slider => {sliderRef = slider;}}>
                    {BERITA_ARTIKEL.map((post) => (
                        <BlogItem key={post.title} {...post} />
                    ))}
                </Slider>
                <div className='hidden lg:flexCenter my-4 space-x-10 text-white'>
                    <button title='prev' className="rounded-full h-10 w-10" onClick={previous}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-[#89060b] duration-200 hover:fill-black'><path d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z" fill-rule="nonzero"/></svg>
                    </button>
                    <button title='next' className="rounded-full h-10 w-10" onClick={next}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-[#89060b] duration-200 hover:fill-black'><path d="m12.012 1.995c-5.518 0-9.998 4.48-9.998 9.998s4.48 9.998 9.998 9.998 9.997-4.48 9.997-9.998-4.479-9.998-9.997-9.998zm0 1.5c4.69 0 8.497 3.808 8.497 8.498s-3.807 8.498-8.497 8.498-8.498-3.808-8.498-8.498 3.808-8.498 8.498-8.498zm1.528 4.715s1.502 1.505 3.255 3.259c.146.147.219.339.219.531s-.073.383-.219.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.336.217-.527.217-.191-.001-.383-.074-.53-.221-.293-.293-.295-.766-.004-1.057l1.978-1.977h-6.694c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.694l-1.979-1.979c-.289-.289-.286-.762.006-1.054.147-.147.339-.221.531-.222.19 0 .38.071.524.215z" fill-rule="nonzero"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default PreviewArtikel