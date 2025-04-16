import { Button } from '@monorepo/ui';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col space-y-2 items-center justify-center">
      <p className="text-3xl text-primary-400">Application Example</p>
      <Button variant="primary" text="Click me" />
    </div>
  );
}
