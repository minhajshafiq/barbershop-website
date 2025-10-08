import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
);
Section.displayName = "Section";

export { Section };
