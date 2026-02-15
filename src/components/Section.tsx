import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("card-premium section-shell", className)}>
      <div className={cn("space-y-4", contentClassName)}>
        {(eyebrow || title || description) && (
          <header className="space-y-3">
            {eyebrow ? (
              <p className="section-eyebrow text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="section-title text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              {title}
            </h2>
            {description ? (
              <p className="section-description max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
            ) : null}
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
