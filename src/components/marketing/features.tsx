import {
  BarChart3,
  CalendarDays,
  DatabaseBackup,
  FileText,
  MessageSquareText,
  Printer,
  Shirt,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import { Reveal, StitchDivider } from "./reveal";
import { SectionHeading } from "./section-heading";
import { fa } from "@/lib/fa";

const PIPELINE = [
  { label: "ثبت‌شده", tone: "text-info border-info/25 bg-info/[0.08]" },
  { label: "در صف انجام", tone: "text-bone-muted border-white/[0.08] bg-white/[0.03]" },
  { label: "در حال انجام", tone: "text-warn border-warn/25 bg-warn/[0.08]" },
  { label: "آماده تحویل", tone: "text-ok border-ok/25 bg-ok/[0.08]" },
  { label: "تحویل‌شده", tone: "text-bone border-gold/25 bg-gold/[0.07]" },
];

const WIZARD = ["مشتری", "لباس و خدمات", "قیمت و پرداخت", "بازبینی و ثبت"];

function CardShell({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="surface group flex h-full flex-col p-5 transition-colors duration-300 hover:border-gold/25 sm:p-6">
        {children}
      </div>
    </Reveal>
  );
}

function CardHead({
  icon: Icon,
  title,
  note,
}: {
  icon: React.ElementType;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold transition-colors duration-300 group-hover:border-gold/40">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      {note && (
        <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] text-bone-faint">
          {note}
        </span>
      )}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24" aria-labelledby="features-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index={2}
          eyebrow="امکانات"
          title="امکاناتی که در کار روزمره خیاطی به کارتان می‌آید"
          description="هر قابلیتی که این‌جا می‌خوانید، همین حالا در دوخت‌یار وجود دارد — نه برنامه‌ریزی آینده، نه وعده."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* کارت بزرگ: سفارش‌ها */}
          <CardShell className="lg:col-span-4" delay={0}>
            <CardHead icon={FileText} title="سفارش‌ها؛ از ثبت تا تحویل، بدون قلم‌چرانی" />
            <p className="mt-4 text-[13.5px] leading-7 text-bone-muted">
              سفارش در چهار قدم ساده ثبت می‌شود و از همان لحظه تا تحویل، وضعیتش را می‌بینید.
              اگر مشتری عجله دارد، سفارش را «فوری» ثبت کنید تا در برنامه روز جا باز کند.
            </p>

            {/* مراحل ثبت سفارش */}
            <div className="mt-5" role="img" aria-label="مراحل ثبت سفارش در دوخت‌یار">
              <p className="mb-2 text-[11.5px] text-bone-faint">مراحل ثبت سفارش:</p>
              <ol className="flex flex-wrap items-center gap-1.5">
                {WIZARD.map((s, i) => (
                  <li key={s} className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-bone">
                      <span className="num flex h-4 w-4 items-center justify-center rounded-full bg-gold/15 text-[9.5px] font-bold text-gold">
                        {fa(i + 1)}
                      </span>
                      {s}
                    </span>
                    {i < WIZARD.length - 1 && <span className="text-bone-faint">←</span>}
                  </li>
                ))}
              </ol>
            </div>

            {/* خط وضعیت سفارش */}
            <div className="mt-5" role="img" aria-label="وضعیت‌های سفارش از ثبت تا تحویل">
              <p className="mb-2 text-[11.5px] text-bone-faint">مسیر وضعیت هر سفارش:</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {PIPELINE.map((s, i) => (
                  <span key={s.label} className="flex items-center gap-1.5">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] ${s.tone}`}>
                      {s.label}
                    </span>
                    {i < PIPELINE.length - 1 && (
                      <span className="text-bone-faint" aria-hidden>
                        ←
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </CardShell>

          {/* مشتریان */}
          <CardShell className="lg:col-span-2" delay={0.08}>
            <CardHead icon={Users} title="مشتری‌ها، همیشه دم دست" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              هر مشتری با شماره موبایل یکتا ثبت می‌شود؛ سابقه سفارش‌ها، پرداخت‌ها و حتی
              یادداشت‌های شخصی‌اش یک‌جا دیده می‌شود. جستجو با نام یا شماره، در چند ثانیه.
            </p>
          </CardShell>

          {/* لباس و خدمات */}
          <CardShell className="lg:col-span-2" delay={0}>
            <CardHead icon={Shirt} title="لباس و خدمات با تعرفه مشخص" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              انواع لباس و خدمت‌های خودتان را یک‌بار تعریف می‌کنید؛ حتی می‌توانید برای هر خدمت
              به‌ازای هر لباس قیمت جدا بگذارید. موقع ثبت سفارش، فقط انتخاب می‌کنید.
            </p>
          </CardShell>

          {/* پرداخت‌ها */}
          <CardShell className="lg:col-span-2" delay={0.08}>
            <CardHead icon={Wallet} title="پرداخت، بیعانه و مانده حساب" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              پرداخت نقدی، کارت یا انتقالی، بیعانه و حتی بازگشت وجه ثبت می‌شود؛ مانده هر سفارش
              را خودِ برنامه حساب می‌کند تا حساب‌وحساب‌کتان پیش بیاید.
            </p>
          </CardShell>

          {/* رسید و برچسب */}
          <CardShell className="lg:col-span-2" delay={0.16}>
            <CardHead icon={Printer} title="رسید چاپی و برچسب لباس" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              برای مشتری رسید چاپی با کد QR صادر می‌شود و برای هر لباس، برچسب با نام مشتری و
              مشخصات سفارش — تا چیزی در کارگاه گم نشود.
            </p>
          </CardShell>

          {/* زمان‌بندی */}
          <CardShell className="lg:col-span-2" delay={0}>
            <CardHead icon={CalendarDays} title="زمان‌بندی و ظرفیت روز" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              ساعات کاری و تعطیلات مغازه را مشخص می‌کنید و ظرفیت پذیرش هر روز را می‌بینید؛
              سفارش فوری هم با توافق شما جای خودش را می‌گیرد.
            </p>
          </CardShell>

          {/* گزارش‌ها */}
          <CardShell className="lg:col-span-2" delay={0.08}>
            <CardHead icon={BarChart3} title="گزارش‌ها و خروجی اطلاعات" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              روند سفارش‌ها و درآمد را در نمودار ببینید؛ فهرست سفارش‌ها، مشتری‌ها و پرداخت‌ها
              را هم می‌توانید به‌صورت فایل CSV خروجی بگیرید.
            </p>
          </CardShell>

          {/* پیامک */}
          <CardShell className="lg:col-span-2" delay={0.16}>
            <CardHead icon={MessageSquareText} title="پیامک اطلاع‌رسانی" note="پس از پیکربندی" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              متن پیام‌ها را خودتان تنظیم می‌کنید. با پیکربندی سرویس پیامک خودتان (مثل
              کاوه‌نگار یا پیامک‌ایران)، مشتری از آماده‌شدن سفارش باخبر می‌شود.
            </p>
          </CardShell>

          {/* پشتیبان‌گیری */}
          <CardShell className="lg:col-span-3" delay={0}>
            <CardHead icon={DatabaseBackup} title="پشتیبان‌گیری اطلاعات" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              از اطلاعات کارتان نسخه پشتیبان تهیه می‌کنید و هر وقت خواستید برمی‌گردانید؛ خیالتان
              راحت که سابقه کارها از دست نمی‌رود.
            </p>
          </CardShell>

          {/* چندنفره */}
          <CardShell className="lg:col-span-3" delay={0.08}>
            <CardHead icon={UserCog} title="استفاده چندنفره با نقش‌ها" />
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              اگر همکار دارید، برایش حساب جدا با نقش «کارمند» بسازید؛ ورود بعد از تلاش‌های
              ناموفق قفل می‌شود و کارهای مهم در سابقه ثبت می‌ماند.
            </p>
          </CardShell>
        </div>
      </div>

      <StitchDivider className="mt-16 sm:mt-24" />
    </section>
  );
}
