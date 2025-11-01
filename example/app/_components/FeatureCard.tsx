import GlowCard from "./GlowCard";

export default function FeatureCard({
  title, desc, icon,
}: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="group h-full">
      <GlowCard className="h-full">
        <div className="flex h-full flex-col">
          <div className="flex items-start gap-4 mb-3">
            <div className="text-2xl">{icon}</div>
            <h3 className="text-xl font-semibold transition-colors group-hover:text-white">
              {title}
            </h3>
          </div>

          {/* spacer pushes desc to bottom so all cards balance */}
          <div className="mt-1 text-white/70 transition-colors group-hover:text-white/85 min-h-[2.25rem]">
            {desc}
          </div>

          {/* optional: fixed minimum card height so they match even with very short text */}
          <div className="mt-auto"></div>
        </div>
      </GlowCard>
    </div>
  );
}
