import ModeToggle from './ModeToggle';

export default function AppHeader() {
  return (
    <header className="fixed left-0 top-0 w-full bg-slate-100 dark:bg-transparent py-4">
      <div className="flex justify-end w-full mx-auto max-w-5xl">
        <ModeToggle />
      </div>
    </header>
  );
}
