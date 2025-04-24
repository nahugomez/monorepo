import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { Post } from '../../types';

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <article
        className="
          max-w-3xl w-full
          bg-white dark:bg-gray-900
          shadow-lg rounded-2xl
          prose prose-slate dark:prose-invert lg:prose-xl
        "
      >
        <header className="mb-2 p-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 dark:text-white">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Publicado el {new Date().toLocaleDateString('es-AR')}
          </p>
        </header>

        <main className="px-6 pb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>{post.body}</p>
        </main>

        <footer className="px-6 pb-6">
          <Link
            href="/"
            className="
              inline-block mt-4 text-blue-600 dark:text-blue-400
              hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            ← Volver a posts
          </Link>
        </footer>
      </article>
    </div>
  );
}
