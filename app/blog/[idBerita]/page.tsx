'use client'

import React from "react";
import { useParams } from 'next/navigation';
import { BERITA_ARTIKEL } from "@/constants";
import ArtikelLain from "@/Components/Artikel_Lain";

const Blog = () => {

  const params = useParams();

  return (
    <div className="md:flex py-32">
      <div className="md:border-r-2 md:w-[65%] border-b-2 md:border-b-0 border-opacity-50 mr-8 border-[#89060b]">
        {BERITA_ARTIKEL.filter((post) => post.id === params.idBerita)
          .map((post, index) => (
            <div key={index} className="md:pl-32 md:pr-10 mx-auto md:px-4 pl-8">
              <div className="bg-slate-700 py-2 p-4 w-fit flex">
                <h1 className="text-lg text-white font-bold">{post.category}</h1>
              </div>
              <div>
                <h2 className="text-3xl font-bold mt-4">{post.title}</h2>
                <div className="flex flex-row mt-2">
                  <p className="text-gray-500 mb-2">
                    Oleh: <span className="text-[tomato]">{post.author}</span> | Tanggal: {post.date}
                  </p>
                </div>
                <img
                  src={post.image}
                  alt="Gambar Artikel"
                  className="w-full h-full mt-4"
                />
                <div
                  className="text-base mt-8 mb-16 sm:w-full"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </div>
            </div>
          ))}
      </div>
      <div className="sticky md:w-1/4 flex justify-center">
        <ArtikelLain></ArtikelLain>
      </div>
    </div>

  );
};

export default Blog;
