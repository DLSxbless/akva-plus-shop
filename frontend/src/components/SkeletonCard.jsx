export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm">
      <div className="aspect-[4/3] w-full bg-neutral-200" />
      <div className="p-5">
        <div className="h-3 w-24 rounded bg-neutral-200" />
        <div className="mt-3 h-6 w-3/4 rounded bg-neutral-200" />
        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="h-3 w-12 rounded bg-neutral-200" />
            <div className="mt-2 h-7 w-20 rounded bg-neutral-200" />
          </div>
          <div className="h-11 w-28 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}