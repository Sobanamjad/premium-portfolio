/** Skeleton placeholder shown while project/testimonial content is "loading". */
export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass rounded-2xl p-5 animate-pulse ${className}`}>
      <div className="h-40 rounded-xl bg-white/[0.06] mb-4" />
      <div className="h-4 w-2/3 rounded bg-white/[0.06] mb-2" />
      <div className="h-3 w-full rounded bg-white/[0.05] mb-1.5" />
      <div className="h-3 w-4/5 rounded bg-white/[0.05]" />
    </div>
  )
}
