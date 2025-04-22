import { Button } from '@monorepo/ui';

export default function Home() {
  return (
    <div
      className="
        min-h-screen w-full
        flex items-center justify-center
        bg-gradient-to-br from-indigo-50 to-indigo-100
        dark:from-gray-900 dark:to-gray-800
        p-6
      "
    >
      <div
        className="
          max-w-sm w-full
          bg-white dark:bg-gray-800
          shadow-2xl rounded-3xl
          p-8 space-y-6
          text-center
        "
      >
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">
          Application Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Bienvenido a tu demo de componentes UI con estilo y consistencia.
        </p>
        <Button variant="primary" text="Click me" />
      </div>
    </div>
  );
}
