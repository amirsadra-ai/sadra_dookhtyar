import { Reveal } from "./reveal";
import { fa } from "@/lib/fa";

/** تیتر استاندارد بخش‌ها با شماره فارسی و زیرنویس. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  index: number;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "start";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-right";

  return (
    <Reveal className={`flex flex-col gap-3 ${alignCls}`}>
      <p className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-gold">
        <span className="num rounded-full border border-gold/25 bg-gold/[0.07] px-2.5 py-0.5 text-[12px] leading-5">
          {fa(String(index).padStart(2, "0"))}
        </span>
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-balance text-[26px] font-bold leading-[1.45] text-bone sm:text-[32px]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-[14.5px] leading-8 text-bone-muted sm:text-[15.5px]">
          {description}
        </p>
      )}
    </Reveal>
  );
}
