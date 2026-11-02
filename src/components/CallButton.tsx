import type { ReactNode } from "react";
import { business } from "../config/business";

type CallButtonProps = {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export function CallButton({
  className,
  children,
  ariaLabel,
}: CallButtonProps): JSX.Element {
  return (
    <a
      href={business.phoneHref}
      aria-label={ariaLabel ?? `Call ${business.phoneDisplay}`}
      className={className}
    >
      {children}
    </a>
  );
}
