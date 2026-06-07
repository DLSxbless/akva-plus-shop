export default function Loader() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        <p className="mt-4 text-sm font-medium text-neutral-500">Загрузка...</p>
      </div>
    </div>
  );
}