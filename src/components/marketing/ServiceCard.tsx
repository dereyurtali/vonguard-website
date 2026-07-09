import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ServiceHref =
  | "/hizmetler/ppf"
  | "/hizmetler/gocuk-tamiri"
  | "/hizmetler/cizik-tamiri"
  | "/iletisim";

interface ServiceCardProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  href: ServiceHref;
  readMore: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  eyebrow,
  title,
  summary,
  bullets,
  href,
  readMore,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col rounded-[20px] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2 md:p-8",
        className,
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-bg text-steel transition-all duration-300 group-hover:-rotate-3 group-hover:border-accent/50 group-hover:text-accent">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <ArrowUpRight
          size={18}
          className="text-text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <p className="vg-overline mt-8 text-text-muted">{eyebrow}</p>

      <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.005em] text-text-primary">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-muted">{summary}</p>

      <ul className="mt-6 space-y-2">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[13px] text-text-muted"
          >
            <span className="mt-2 h-[3px] w-[3px] shrink-0 rounded-full bg-accent" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <div className="vg-hairline" />
        <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent transition-colors">
          {readMore} →
        </p>
      </div>
    </Link>
  );
}
