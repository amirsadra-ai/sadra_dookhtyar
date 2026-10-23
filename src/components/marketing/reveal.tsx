"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * ظاهرشدن نرم عناصر هنگام اسکرول.
 * با احترام به تنظیم «کاهش حرکت» کاربر، انیمیشن را غیرفعال می‌کند.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** جداکننده خط‌دوخت — با انیمیشن کشیده‌شدن هنگام اسکرول. */
export function StitchDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative mx-auto h-px w-full max-w-6xl ${className}`} aria-hidden="true">
      <svg className="h-px w-full" preserveAspectRatio="none" viewBox="0 0 1200 2" fill="none">
        <motion.line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke="rgba(214,180,106,0.30)"
          strokeWidth="2"
          strokeDasharray="10 9"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
