import type { SVGProps } from "react";

/** آیکون‌های اختصاصی هویت دوخت‌یار — دست‌ساز، سبک و بدون وابستگی. */

export function NeedleThreadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M40 8 L14 34 C11 37 10 40 12 42 C14 44 17 43 20 40 L30 30"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M14 34 C20 28 24 26 30 26 C36 26 38 30 36 33 C34 36 29 36 27 33 C25 30 28 26 33 25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3.5 3"
      />
      <circle cx="39" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ScissorsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="14" cy="14" r="5.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="14" cy="34" r="5.5" stroke="currentColor" strokeWidth="2.4" />
      <path d="M18.5 17.5 L38 33 M18.5 30.5 L38 15" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function TapeMeasureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <rect x="5" y="18" width="26" height="12" rx="6" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="15" cy="24" r="2" fill="currentColor" />
      <path
        d="M33 22 h4 v4 h-4 M39 20 v8 M42 21 v6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** نشان لوگوی دوخت‌یار — سوزن با نخ و کوک. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-xl border border-gold/30 bg-gold/[0.07] text-gold ${className}`}
    >
      <NeedleThreadIcon className="h-[62%] w-[62%]" />
    </span>
  );
}
