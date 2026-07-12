import Image from "next/image";
import { Reveal } from "./Reveal";
import portrait from "@/assets/portrait.jpg";
import { Mail, MapPin, Phone } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative rounded-3xl overflow-hidden shadow-elegant">
                <Image
                  src={portrait}
                  alt="Prathamesh Chaudhary"
                  width={896}
                  height={1152}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="font-display font-bold text-2xl">Prathamesh Chaudhary</div>
                  <div className="text-sm text-muted-foreground">AI/ML · React Native</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  { icon: MapPin, label: "Pune, Maharashtra, India" },
                  { icon: Mail, label: "prathameshchaudhary7122@gmail.com" },
                  { icon: Phone, label: "+91 9284240426" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-9 h-9 rounded-lg glass grid place-items-center text-primary">
                      <Icon size={16} />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-12">
            <Reveal>
              <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">About</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
                A team-oriented engineer turning <span className="text-gradient-primary">complex systems</span> into shipped products.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I specialize in bridging machine learning, mobile, and scalable backends. My recent work focuses on{" "}
                  <span className="text-foreground">smart vending machine platforms</span> — building React Native operator apps,
                  payment integrations, and robust API endpoints.
                </p>
                <p>
                  I'm equally comfortable training a CNN, designing a REST API, or debugging a complex state flow at 2am. I care about
                  craft, performance, and shipping things that actually work in the wild.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Mobile", body: "React Native, React, native modules, OTA updates, push & deep linking." },
                  { title: "AI/ML", body: "TensorFlow, computer vision, data analysis, model deployment with FastAPI." },
                  { title: "Testing & Tools", body: "Jest, Mocha, Unit Testing, Postman, Git, Firebase, Cursor, Claude Code." },
                  { title: "Backend", body: "Django REST, FastAPI, PostgreSQL, SQL, Firebase, JWT auth, Docker." },
                ].map((c) => (
                  <div key={c.title} className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors">
                    <div className="text-xs font-mono uppercase text-primary tracking-widest mb-2">{c.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{c.body}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
