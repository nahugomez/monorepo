import { Button } from '@monorepo/ui';

export default function Home() {
  return (
    <div
      className="
        min-h-screen w-full
        flex items-center justify-center
        bg-gradient-to-br from-blue-50 to-blue-100
        dark:from-gray-800 dark:to-gray-900
        p-6
      "
    >
      <div
        className="
          max-w-md w-full
          bg-white dark:bg-gray-800
          shadow-xl rounded-2xl
          p-8
          text-center space-y-6
        "
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Other Application Example
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Integrando componentes de UI desde tu monorepo, con estilo y
          consistencia.
        </p>
        <Button variant="primary" text="Click me" />
      </div>
    </div>
  );
}
