import { BERITA_ARTIKEL } from '@/constants';
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArtikelLain() {
    const recent_news = BERITA_ARTIKEL.slice(0, 7);
    const param = useParams()

    return (
        <div className="w-full">
            <h1 className="font-bold text-3xl p-8">Artikel Lain</h1>
            {recent_news.filter((post) => post.id !== param.idBerita).map((post, index) => (
                <Link href={`/blog/${post.id}`}>
                    <div key={index} className="p-4 w-full flex space-x-2 bg-gray-100 mb-8 rounded shadow-xl">
                        <img className="w-32 w max-h-20 object-cover" src={post.image} alt={post.title} />
                        <h1 className="text-lg mt-2 font-semibold">{post.title}</h1>
                    </div>
                </Link>

            ))}
        </div>
    );
}