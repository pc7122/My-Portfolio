import Image from "next/image";
import { Reveal } from "./Reveal";
import {
  Smartphone,
  Cpu,
  Wifi,
  CreditCard,
  BarChart3,
  Wrench,
} from "lucide-react";
import vending from "@/assets/project-vending.jpg";

const features = [
  {
    icon: Smartphone,
    title: "React Native operator apps",
    body: "Cross-platform apps (iOS + Android) for technicians and store owners with offline-first sync.",
  },
  {
    icon: Cpu,
    title: "Backend API & Services",
    body: "Python and Django REST/FastAPI microservices to handle secure transactions and machine states.",
  },
  {
    icon: Wifi,
    title: "Real-time synchronization",
    body: "Low-latency web services and synchronization pipelines to track inventory levels, errors, and sales events.",
  },
  {
    icon: CreditCard,
    title: "Contactless payments",
    body: "Integrations with UPI, RFID and QR for tap-and-go cashless transactions.",
  },
  {
    icon: BarChart3,
    title: "Real-time dashboards",
    body: "Operator dashboards visualising fleet health, revenue and predictive restock alerts.",
  },
  {
    icon: Wrench,
    title: "Advanced tools",
    body: "Integrated automated testing tools and telemetry tracking for instant troubleshooting.",
  },
];

export const Mobile = () => {
  return (
    <section id="mobile" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-aurora opacity-40 pointer-events-none" />
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <Reveal className="lg:col-span-7">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              Mobile · Backend · Cloud
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              From{" "}
              <span className="text-gradient-primary">server to screen</span> —
              reliable systems that scale.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              I build robust software solutions around smart vending machines:
              secure Django/FastAPI backend servers, real-time data pipelines,
              and the React Native apps that operators and users rely on every day.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden glass shadow-elegant">
              <Image
                src={vending}
                alt="Smart vending machine"
                width={1280}
                height={896}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group glass rounded-2xl p-7 h-full hover:border-primary/50 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-5 shadow-glow group-hover:scale-110 transition-transform">
                  <f.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
