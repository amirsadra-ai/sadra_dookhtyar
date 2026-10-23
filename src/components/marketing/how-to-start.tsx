import { Reveal, StitchDivider } from "./reveal";
import { SectionHeading } from "./section-heading";
import { fa } from "@/lib/fa";

const STEPS = [
  {
    title: "فرم درخواست را پر کنید",
    body: "همین پایین صفحه، فرم کوتاهی هست: نام، شماره موبایل و نوع درخواست. کمتر از یک دقیقه طول می‌کشد.",
  },
  {
    title: "هماهنگی و شناخت نیاز خیاطی‌تان",
    body: "بعد از ثبت درخواست، برای شناخت نوع کارتان — مزون هستید، کارگاه یا خیاطی مستقل؟ — با شما هماهنگ می‌کنیم.",
  },
  {
    title: "دمو را ببینید و بررسی کنید",
    body: "برنامه را زنده می‌بینید و با امکاناتش کار می‌کنید تا مطمئن شوید با نیاز خیاطی‌تان جور است.",
  },
  {
    title: "هماهنگی نصب و راه‌اندازی",
    body: "اگر پس از دیدن دمو راضی بودید، جزئیات نصب، تنظیمات اولیه و شرایط استفاده را با هم مشخص می‌کنیم.",
  },
  {
    title: "شروع استفاده",
    body: "دوخت‌یار با داده اولیه خیاطی شما تنظیم می‌شود و از همان روز اول، کار را منظم‌تر ادامه می‌دهید.",
  },
];

export function HowToStart() {
  return (
    <section id="start" className="relative py-16 sm:py-24" aria-labelledby="start-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index={4}
              eyebrow="نحوه شروع"
              title="از درخواست تا شروع کار، پنج قدم"
              description="فرایند شفاف است: اول برنامه را می‌بینید، بعد تصمیم می‌گیرید. هیچ‌چیز را از روی تعارف قبول نمی‌کنید."
              align="start"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 rounded-xl2 border border-white/[0.07] bg-ink-900/70 p-4 text-[12.5px] leading-6 text-bone-faint">
                جزئیات نصب، پشتیبانی و شرایط استفاده، در مرحله هماهنگی و شفاف مشخص می‌شود؛
                درباره چیزی که هنوز قطعی نیست، وعده قطعی نمی‌دهیم.
              </p>
            </Reveal>
          </div>

          {/* خط مراحل — با موتیف نوار متر */}
          <ol className="relative flex flex-col gap-0 border-r border-dashed border-gold/25 pr-6 sm:pr-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <li className="relative pb-9 last:pb-0">
                  {/* نشان‌گر مثل خط‌کش متر */}
                  <span
                    className="num absolute -right-[37px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-ink-950 text-[12px] font-bold text-gold sm:-right-[45px]"
                    aria-hidden="true"
                  >
                    {fa(i + 1)}
                  </span>
                  <h3 className="text-[16.5px] font-bold leading-7 text-bone">{s.title}</h3>
                  <p className="mt-1.5 max-w-lg text-[13.5px] leading-7 text-bone-muted">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <StitchDivider className="mt-16 sm:mt-24" />
    </section>
  );
}
