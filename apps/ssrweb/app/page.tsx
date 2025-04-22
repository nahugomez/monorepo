// app/page.tsx
import Link from 'next/link';
import { Post } from './types';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener los posts');
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main
      className="
      min-h-screen bg-gray-100 dark:bg-gray-900
      py-10 px-4 flex justify-center
    "
    >
      <div className="max-w-5xl w-full">
        <h1
          className="
          text-4xl font-extrabold text-center
          text-gray-900 dark:text-gray-100 mb-12
        "
        >
          Listado de Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="
                block bg-white dark:bg-gray-800
                shadow-md hover:shadow-lg
                rounded-xl p-6
                transition-transform transform
                hover:-translate-y-1
              "
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {post.body}
              </p>
              <span
                className="
                text-blue-600 dark:text-blue-400
                font-medium hover:underline
              "
              >
                Leer más →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
