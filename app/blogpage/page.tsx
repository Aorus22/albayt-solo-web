import React from 'react';
import BlogItem from '@/Components/Card_Berita'
import { BERITA_ARTIKEL } from '@/constants';

const Blog = () => {
  
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10">
      <h1 className='font-medium text-5xl text-[#3C3633] text-center items-center my-7'>
        <span className='font-bold text-[tomato]'>BLOG</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {BERITA_ARTIKEL.map((post) => (
          <BlogItem key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
