import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Rocket, Sparkles, UserRound } from "lucide-react";
import { Github } from "@/components/icons/Github";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/layout/MarketingPageShell";

export default function AboutPage() {
  return (
    <MarketingPageShell className="max-w-6xl">
      <section className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-white/75 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/45 md:p-8">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/20 via-blue-400/10 to-transparent" />
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
              <Image
                src="https://github.com/PorKeat.png"
                alt="Seng Porkeat"
                width={144}
                height={144}
                unoptimized
                className="relative h-36 w-36 rounded-full border border-white/30 object-cover shadow-[0_24px_70px_rgba(75,134,247,0.28)]"
              />
            </div>

            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              <UserRound className="h-3.5 w-3.5" />
              Creator of Profilo
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Hi, I&apos;m<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Seng Porkeat.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/75 dark:text-foreground/70">
              DevOps engineer and cloud automation enthusiast building tools that help developers present their work with less friction.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["Cloud Native", "CI/CD", "Automation", "Open Source"].map((item) => (
                <span key={item} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-black/8 bg-white/75 p-8 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/45">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">About Profilo</span>
            <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
              Building better GitHub profiles.
            </h2>
            <p className="text-lg leading-relaxed text-foreground/80 dark:text-foreground/70">
              Profilo started from a simple idea: your GitHub profile should look polished without forcing you to wrestle with Markdown, badges, and stats APIs by hand.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Fast to use", "Choose sections, customize details, preview instantly, and export clean Markdown."],
              ["Built in public", "Designed for developers who care about open-source, clarity, and creative profiles."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-black/8 bg-white/65 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/35">
                <Sparkles className="mb-4 h-5 w-5 text-primary" />
                <h3 className="mb-2 font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-black/8 bg-white/75 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/45">
          <CardContent className="p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">No Backend, No Auth</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Profilo is meant to feel immediate. Everything runs in your browser, so you can build, preview, and export without account setup.
            </p>
          </CardContent>
        </Card>

        <Card className="border-black/8 bg-white/75 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/45">
          <CardContent className="p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Github className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Open Source</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              The project is open for ideas, templates, blocks, and improvements from the community.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_24px_80px_rgba(75,134,247,0.16)] backdrop-blur-2xl">
        <div className="grid items-center gap-6 p-8 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/15">
              <Rocket className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Ready to build your own profile?</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
              Start with a template, personalize your sections, then export a README that actually feels like you.
            </p>
          </div>
          <Link href="/builder">
            <Button size="lg" className="rounded-full bg-primary px-8 font-bold text-black hover:bg-primary/90">
              Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/8 bg-white/65 p-8 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/35">
        <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Why it matters</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">Your profile is your first handshake.</h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-foreground/72">
            <p>
              Recruiters, collaborators, and open-source maintainers often see your README before anything else. A thoughtful profile can explain what you build, what you care about, and how people can work with you.
            </p>
            <p>
              Profilo gives you a visual way to shape that story, then keeps the output simple: clean Markdown that belongs to you.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link
          href="https://github.com/PorKeat/profilo"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/55 px-5 py-3 text-sm font-bold text-primary shadow-sm backdrop-blur-xl transition-colors hover:bg-primary/10 dark:bg-white/[0.04]"
        >
          <Github className="h-4 w-4" />
          View the project on GitHub
        </Link>
      </div>
    </MarketingPageShell>
  );
}
