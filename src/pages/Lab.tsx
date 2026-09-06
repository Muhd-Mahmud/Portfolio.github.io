import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { WavyBackground } from "@/components/ui/wavy-background";
import { labProjects, type LabProject } from "@/data/lab-projects";
import { Check } from "lucide-react";

function ChromeThumb({ project }: { project: LabProject }) {
  const Icon = project.icon;
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/10">
      {/* Brushed-silver metallic base */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#e6e8ec_0%,#9ca3af_18%,#f3f4f6_38%,#6b7280_58%,#d1d5db_78%,#4b5563_100%)]" />
      {/* Fine brushed-metal streaks */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.6)_0px,rgba(255,255,255,0)_2px,rgba(0,0,0,0.15)_3px,rgba(255,255,255,0)_5px)]" />
      {/* Specular sweep */}
      <div className="absolute -inset-x-10 -top-10 h-24 rotate-[18deg] bg-white/50 blur-2xl opacity-40" />
      {/* Accent tint on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40 mix-blend-color"
        style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }}
      />
      {/* Embossed icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className="h-14 w-14 text-slate-700/80 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}

function ProjectTab({ project }: { project: LabProject }) {
  return (
    <Link
      to={`/lab/${project.slug}`}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset" }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 40px -8px ${project.accent}66` }}
      />
      <div className="relative">
        <ChromeThumb project={project} />
        {project.status === "completed" && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-black/70 px-2 py-0.5 text-[10px] font-medium text-emerald-300 backdrop-blur">
            <Check className="h-2.5 w-2.5" /> Completed
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold leading-tight text-white">
        {project.title}
      </h3>
      <p className="mt-1 text-xs text-white/60">
        {project.morphology} · {project.simulation}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-white/75">{project.overview}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70"
          >
            {t}
          </span>
        ))}
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/60 transition-colors group-hover:text-white">
        View project
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  );
}

export function LabPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <WavyBackground className="w-full">
        <div className="pt-28 px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <Card className="w-full bg-black/[0.96] relative overflow-hidden">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
              <div className="p-8 md:p-12">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Robotics Simulation Lab
                </h1>
                <p className="mt-5 max-w-3xl text-lg text-neutral-200">
                  This portfolio is designed around two axes: robot morphology and robot
                  intelligence. The goal is to experience how the same autonomy concepts change
                  when the physical system changes.
                </p>

                <div className="mt-8 max-w-3xl space-y-4 text-neutral-300">
                  <h2 className="text-xl font-semibold text-white">The philosophy</h2>
                  <p>
                    I'm not trying to become an expert in every robot at once. I'm deliberately
                    building a broad robotics foundation by comparing small, measurable vertical
                    slices. For each project I ship something that runs, something that is
                    measured, and something that is documented and can be shown.
                  </p>
                  <p>
                    My rule is simple: I learn from building. I read just enough to unblock the
                    next step, build the smallest version that works, debug it, measure it,
                    document it, and then move on. Each project is a complete research system in
                    miniature, not a pile of features — so I spend my effort on experiments and
                    documentation rather than scope creep.
                  </p>
                  <p className="text-neutral-400">
                    From a ROS 2 mobile robot to a multi-robot embodied-AI mission, entirely in
                    simulation first.
                  </p>
                </div>
              </div>
            </Card>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {labProjects.map((project) => (
                <ProjectTab key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
