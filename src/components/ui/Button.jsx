import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import RollText from "./RollText";
import { cn } from "../../lib/utils";

/**
 * Pill button. Renders a router Link (`to`), an anchor (`href`) or a button.
 * The default ↗ icon turns to → on hover.
 */
export function Button({ to, href, children, variant = "primary", icon: Icon = FiArrowUpRight, className, ...rest }) {
  const classes = cn(variant === "primary" ? "btn-primary" : "btn-ghost", "group/roll", className);
  const rotates = Icon === FiArrowUpRight;
  const content = (
    <>
      <RollText>{children}</RollText>
      {Icon && (
        <Icon
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo",
            rotates && "group-hover/roll:rotate-45"
          )}
        />
      )}
    </>
  );

  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>;
  return <button type="button" className={classes} {...rest}>{content}</button>;
}

/** Inline text link with an underline that draws in on hover. */
export function ArrowLink({ to, href, children, className, icon: Icon = FiArrowUpRight, ...rest }) {
  const classes = cn("group/link -my-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium", className);
  const content = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover/link:origin-left group-hover/link:scale-x-100" />
      </span>
      <Icon
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </>
  );
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  return <a href={href} className={classes} {...rest}>{content}</a>;
}
