import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { WavyBackground } from "@/components/ui/wavy-background";
import { getLabProject, type Evidence, type Workflow } from "@/data/lab-projects";
import { ArrowLeft, ArrowRight, Check, Download, Github, ImageIcon } from "lucide-react";

// Vite serves this site from a sub-path (/Portfolio/), so /public assets must be
// resolved against the configured base rather than referenced as bare "/lab/...".
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-white md:text-2xl">{children}</h2>
  );
}

// Renders the captured artifact, falling back to a labelled drop-zone so the
// page stays presentable before the screenshots are committed.
function EvidenceImage({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center ${className}`}
      >
        <ImageIcon className="h-6 w-6 text-white/30" />
        <p className="text-xs text-white/40">{alt}</p>
        {src && (
          <code className="text-[10px] text-white/25">public/{src}</code>
        )}
      </div>
    );
  }

  // Source captures range from portrait CAD renders to wide RViz screenshots,
  // so contain (not cover) keeps every frame uncropped.
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`aspect-video w-full rounded-xl border border-white/10 bg-neutral-900 object-contain ${className}`}
    />
  );
}

function FlowNode({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center text-sm font-medium text-white"
      style={{ boxShadow: `0 0 30px -18px ${accent}` }}
    >
      {label}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex h-8 items-center justify-center">
      <div className="h-full w-px bg-white/20" />
    </div>
  );
}

// Splits one column into two (or merges two back into one) using the same
// 25% / 75% centres as the two-column grid below it.
function FlowFork({ direction }: { direction: "split" | "merge" }) {
  const stemTop = direction === "split" ? "top-0" : "bottom-0";
  const legEdge = direction === "split" ? "bottom-0" : "top-0";
  return (
    <div className="relative h-10">
      <div className={`absolute ${stemTop} left-1/2 h-1/2 w-px bg-white/20`} />
      <div className="absolute left-1/4 right-1/4 top-1/2 h-px bg-white/20" />
      <div className={`absolute ${legEdge} left-1/4 h-1/2 w-px bg-white/20`} />
      <div className={`absolute ${legEdge} right-1/4 h-1/2 w-px bg-white/20`} />
    </div>
  );
}

function WorkflowDiagram({ workflow, accent }: { workflow: Workflow; accent: string }) {
  return (
    <div className="mx-auto max-w-md">
      {workflow.steps.map((step, i) => (
        <div key={step}>
          {i > 0 && <FlowArrow />}
          <FlowNode label={step} accent={accent} />
        </div>
      ))}

      {workflow.branch && (
        <>
          <FlowFork direction="split" />
          <div className="grid grid-cols-2 gap-4">
            {workflow.branch.map((b) => (
              <FlowNode key={b} label={b} accent={accent} />
            ))}
          </div>
        </>
      )}

      {workflow.merge && (
        <>
          <FlowFork direction="merge" />
          <FlowNode label={workflow.merge} accent={accent} />
        </>
      )}
    </div>
  );
}

function EvidenceCard({ item }: { item: Evidence }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <EvidenceImage src={item.image} alt={item.title} />
      <figcaption className="mt-3">
        <p className="text-xs uppercase tracking-wider text-white/40">
          {item.label}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{item.caption}</p>
      </figcaption>
    </figure>
  );
}

export function LabProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getLabProject(slug) : undefined;
  const hero = project?.evidence?.slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <WavyBackground className="w-full">
        <div className="pt-28 px-6 pb-20">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/lab"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Lab
            </Link>

            <Card className="mt-4 w-full bg-black/[0.96] relative overflow-hidden">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
              <div className="p-8 md:p-12">
                {project ? (
                  <>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        Week {project.week} · {project.focus}
                      </div>
                      {project.status === "completed" && (
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                          <Check className="h-3 w-3" /> Completed
                        </div>
                      )}
                    </div>

                    <h1 className="mt-4 text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                      {project.title}
                    </h1>
                    {project.subtitle && (
                      <p className="mt-3 max-w-2xl text-lg text-neutral-300">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-white/60">
                      {project.morphology} · {project.simulation}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        <Github className="h-4 w-4" /> View code
                      </a>
                    )}

                    {project.description ? (
                      <>
                        {/* Hero: original design beside the simulated result. */}
                        {hero && hero.length === 2 && (
                          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {hero.map((item) => (
                              <div key={item.label}>
                                <EvidenceImage src={item.image} alt={item.title} />
                                <p className="mt-2 text-center text-xs uppercase tracking-wider text-white/40">
                                  {item.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-12 space-y-4 text-neutral-300">
                          <SectionHeading>Overview</SectionHeading>
                          {project.description.map((p) => (
                            <p key={p.slice(0, 40)} className="leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>

                        {project.objective && (
                          <div className="mt-10">
                            <SectionHeading>Objective</SectionHeading>
                            <p className="mt-3 leading-relaxed text-neutral-300">
                              {project.objective}
                            </p>
                          </div>
                        )}

                        {project.stack && (
                          <div className="mt-10">
                            <SectionHeading>Technologies</SectionHeading>
                            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {project.stack.map((s) => (
                                <div
                                  key={s.label}
                                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                                >
                                  <dt className="text-xs uppercase tracking-wider text-white/40">
                                    {s.label}
                                  </dt>
                                  <dd className="mt-1 text-sm font-medium text-white">
                                    {s.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        )}

                        {project.workflow && (
                          <div className="mt-12">
                            <SectionHeading>Technical workflow</SectionHeading>
                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                              <WorkflowDiagram
                                workflow={project.workflow}
                                accent={project.accent}
                              />
                            </div>
                            <p className="mt-4 leading-relaxed text-neutral-300">
                              {project.workflow.note}
                            </p>
                          </div>
                        )}

                        {project.evidence && (
                          <div className="mt-12">
                            <SectionHeading>Results &amp; evidence</SectionHeading>
                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                              {project.evidence.map((item) => (
                                <EvidenceCard key={item.label} item={item} />
                              ))}
                            </div>
                          </div>
                        )}

                        {project.artifacts && (
                          <div className="mt-8 flex flex-wrap gap-3">
                            {project.artifacts.map((a) => (
                              <a
                                key={a.file}
                                href={asset(a.file)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                              >
                                <Download className="h-4 w-4" /> {a.label}
                              </a>
                            ))}
                          </div>
                        )}

                        {project.learned && (
                          <div className="mt-12">
                            <SectionHeading>What I learned</SectionHeading>
                            <ul className="mt-4 space-y-2.5">
                              {project.learned.map((l) => (
                                <li key={l} className="flex gap-3 text-neutral-300">
                                  <Check
                                    className="mt-1 h-4 w-4 shrink-0"
                                    style={{ color: project.accent }}
                                  />
                                  <span className="leading-relaxed">{l}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {project.next && (
                          <div className="mt-12">
                            <SectionHeading>What comes next</SectionHeading>
                            {project.next.slug ? (
                              <Link
                                to={`/lab/${project.next.slug}`}
                                className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/25 hover:bg-white/[0.06]"
                              >
                                <span className="text-sm font-medium text-white">
                                  {project.next.label}
                                </span>
                                <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                              </Link>
                            ) : (
                              <p className="mt-4 text-neutral-300">{project.next.label}</p>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="mt-8 max-w-2xl text-lg text-neutral-300">
                          {project.overview}
                        </p>
                        <div className="mt-10 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
                          <p className="text-white/70">
                            Full write-up, build log, demo video, and code are on the way.
                          </p>
                          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70">
                            Coming soon
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                      Project not found
                    </h1>
                    <p className="mt-4 text-neutral-300">
                      That project doesn't exist yet. Head back to the Lab to browse the
                      12-week roadmap.
                    </p>
                    <Link
                      to="/lab"
                      className="mt-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                    >
                      Back to Lab
                    </Link>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
