import Link from 'next/link';
import React from 'react';

interface BlogItemProps {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  } else {
    return text;
  }
};

const BlogItem: React.FC<BlogItemProps> = ({ id, title, author, date, image, content }) => {
  const truncatedContent = truncateText(content, 230);

  return (
    <Link href={`/blog/${id}`}>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex w-full justify-center">
          <div className="w-max max-w-md text-center">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-500 mb-2">
              Oleh: {author} | Tanggal: {date}
            </p>
            <img src={image} alt="Blog image" className="w-full h-64 object-cover mx-auto mb-4" />
            <div className="w-full mb-4 text-gray-700 text-center" dangerouslySetInnerHTML={{ __html: truncatedContent }} />
            <div className="flex justify-center">
              <div className="text-[tomato] hover:underline bg-transparent border border-[tomato] py-2 px-4 rounded-md">
                Lanjutkan Membaca
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
