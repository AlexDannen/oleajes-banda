"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import type { AnalyticsCategory } from "@/lib/analytics";
import { trackClick } from "@/lib/track-client";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  analyticsCategory: AnalyticsCategory;
  analyticsLabel: string;
};

export default function TrackedLink({
  analyticsCategory,
  analyticsLabel,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackClick(analyticsCategory, analyticsLabel);
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
