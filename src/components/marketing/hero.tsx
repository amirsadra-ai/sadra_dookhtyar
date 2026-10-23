"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, CalendarClock, CheckCircle2, ReceiptText, Smartphone } from "lucide-react";
import { fa, faToman } from "@/lib/fa";

const easeSilk = [0.22, 0.61, 0.36, 1] as const;

/* ── تایپ عنوان هیرو — مثل تایپ‌شدن با نشانگر چشمک‌زن ── */
const HERO_LINE_1 = "مدیریت خیاطی،";
const HERO_LINE_2 = "منظم‌تر از همیشه.";
const TYPE_START_DELAY = 500; // مسی‌ث تا شروع تایپ
const TYPE_SPEED_1 = 42; // سرعت تایپ سطر اول (مسی‌ث بر نویسه)
const TYPE_SPEED_2 = 46; // سرعت تایپ سطر دوم

/** نشانگر تایپ — چشمک‌زن طلایی/استخوانی */
function TypeCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <span className="type-cursor" aria-hidden="true" />;
}

/** کارت سفارش شناور — بازسازی وفادار از کارت سفارش در رابط دوخت‌یار */
function OrderCard() {
  return (
    <div className="surface w-full max-w-[380px] p-4 sm:p-5" dir="rtl">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="num rounded-lg border border-gold/25 bg-gold/[0.07] px-2.5 py-1 text-[12.5px] font-semibold text-gold">
            {fa("DY-1042")}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-info/25 bg-info/[0.08] px-2.5 py-1 text-[11.5px] text-info">
            <span className="h-1.5 w-1.5 rounded-full bg-info" aria-hidden />
            در حال انجام
          </span>
        </div>
        <span className="text-[11px] text-bone-faint">امروز، ۱۰:۲۴</span>
      </div>

      <div className="pt-3">
        <p className="text-[13px] text-bone-muted">
          مشتری: <span className="font-medium text-bone">سارا رضایی</span>
        </p>
        <p className="num mt-1 text-[11.5px] text-bone-faint" dir="ltr" style={{ textAlign: "right" }}>
          ۰۹۱۲ ۱۸۴ ۶۵۴۳
        </p>
      </div>

      <ul className="mt-3 space-y-2">
        <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
          <span className="text-[12.5px] text-bone">مانتو — تعمیر آستین ×۱</span>
          <span className="num text-[12.5px] text-bone-muted">{faToman(180000)}</span>
        </li>
        <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
          <span className="text-[12.5px] text-bone">شلوار — کوتاه‌کردن ×۱</span>
          <span className="num text-[12.5px] text-bone-muted">{faToman(120000)}</span>
        </li>
      </ul>

      <div className="mt-3 rounded-lg border border-white/[0.05] bg-ink-900 px-3 py-2.5">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-bone-muted">مانده حساب</span>
          <span className="num font-semibold text-warn">{faToman(150000)} تومان</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-l from-gold to-gold-dark" />
        </div>
        <p className="num mt-1.5 text-[10.5px] text-bone-faint">
          پرداخت‌شده: {faToman(150000)} از {faToman(300000)} تومان
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="flex items-center gap-1.5 text-[11.5px] text-bone-muted">
          <CalendarClock className="h-3.5 w-3.5 text-gold" aria-hidden />
          موعد تحویل: <span className="num">۳۰ مهر</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11.5px] text-ok">
          <ReceiptText className="h-3.5 w-3.5" aria-hidden />
          رسید چاپ شد
        </span>
      </div>
    </div>
  );
}

/** کارت متریک کوچک شناور */
function MetricCard() {
  return (
    <div className="surface w-[172px] p-3.5" dir="rtl">
      <p className="text-[11px] text-bone-faint">سفارش‌های امروز</p>
      <p className="num mt-1.5 text-[26px] font-bold leading-none text-bone">{fa(7)}</p>
      <div className="mt-2.5 flex h-8 items-end gap-1" aria-hidden>
        {[35, 55, 40, 70, 52, 85, 64].map((h, i) => (
          <div
            key={i}
            className={`w-full rounded-sm ${i === 5 ? "bg-gold/70" : "bg-white/[0.12]"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-2 text-[10.5px] text-ok">۲ سفارش آماده تحویل</p>
    </div>
  );
}

/** اعلان پرداخت شناور */
function PaymentToast() {
  return (
    <div className="surface flex w-[248px] items-center gap-2.5 p-3" dir="rtl">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ok/25 bg-ok/[0.08] text-ok">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-bone">پرداخت ثبت شد</p>
        <p className="num truncate text-[11px] text-bone-faint">
          {faToman(150000)} تومان — خانم کریمی
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -36]);
  const yB = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 28]);

  /* ماشین‌نویس عنوان — با احترام به reduce-motion */
  // null یعنی تایپ شروع نشده؛ در حالت reduce کل متن مستقیم مشتق می‌شود
  const [progress, setProgress] = useState<{ t1: number; t2: number } | null>(null);
  const typed1 = reduce ? HERO_LINE_1.length : (progress?.t1 ?? 0);
  const typed2 = reduce ? HERO_LINE_2.length : (progress?.t2 ?? 0);
  const line1Done = typed1 >= HERO_LINE_1.length;
  const line2Done = typed2 >= HERO_LINE_2.length;
  const activeLine = !line1Done ? 1 : !line2Done ? 2 : 0;
  // بعد از پایان تایپ، نشانگر روی سطر دوم می‌ماند و چشمک می‌زند
  const cursorLine = reduce ? 0 : activeLine === 0 ? 2 : activeLine;

  useEffect(() => {
    if (reduce) return; // بدون انیمیشن — متن کامل از reduce مشتق می‌شود
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = setTimeout(() => {
      let i = 0;
      let j = 0;
      const step = () => {
        if (cancelled) return;
        if (i < HERO_LINE_1.length) {
          i += 1;
          setProgress({ t1: i, t2: j });
          timer = setTimeout(step, TYPE_SPEED_1);
        } else if (j < HERO_LINE_2.length) {
          j += 1;
          setProgress({ t1: i, t2: j });
          timer = setTimeout(step, TYPE_SPEED_2);
        }
      };
      step();
    }, TYPE_START_DELAY);
    return () => {
      cancelled = true;
      clearTimeout(start);
      if (timer) clearTimeout(timer);
    };
  }, [reduce]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: easeSilk },
        };

  return (
    <section
      id="top"
      className="pattern-paper relative overflow-hidden pb-14 pt-[104px] sm:pb-20 sm:pt-[128px]"
    >
      {/* هاله طلایی ظریف */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 78% 8%, rgba(214,180,106,0.09), transparent 65%), radial-gradient(ellipse 40% 35% at 12% 90%, rgba(214,180,106,0.05), transparent 60%)",
        }}
      />

      {/* نخ و سوزن پس‌زمینه */}
      {!reduce && (
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-60"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <motion.path
            d="M1120 90 C 980 210, 1240 260, 1080 380 C 940 490, 1180 520, 1020 640 C 900 730, 1010 780, 960 860"
            stroke="rgba(214,180,106,0.20)"
            strokeWidth="1.6"
            strokeDasharray="9 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M60 240 C 220 300, 120 420, 300 470"
            stroke="rgba(214,180,106,0.14)"
            strokeWidth="1.4"
            strokeDasharray="7 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
          />
        </svg>
      )}

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* متن هیرو */}
        <div className="text-center lg:text-right">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-3.5 py-1.5 text-[12.5px] text-gold-light"
          >
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            سامانه مدیریت سفارش خیاطی — فارسی و راست‌چین
          </motion.p>

          <h1 className="mt-5 min-h-[2.7em] text-[34px] font-black leading-[1.35] text-bone sm:text-[46px] lg:text-[50px]">
            <span className="sr-only">مدیریت خیاطی، منظم‌تر از همیشه.</span>
            <span aria-hidden="true">
              <span>
                {HERO_LINE_1.slice(0, typed1)}
                <TypeCursor visible={cursorLine === 1} />
              </span>
              <br />
              <span className="text-gold-light">
                {typed2 > 0 ? HERO_LINE_2.slice(0, typed2) : "\u00A0"}
                <TypeCursor visible={cursorLine === 2} />
              </span>
            </span>
          </h1>

          <motion.p
            {...rise(1.05)}
            className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-8 text-bone-muted sm:text-[16.5px] lg:mx-0"
          >
            دوخت‌یار جای دفتر و یادداشت‌های پراکنده را می‌گیرد: مشتری‌ها، سفارش‌های دوخت،
            جزئیات هر لباس، پرداخت‌ها و موعد تحویل — همه‌چیز یک‌جا، مرتب و همیشه در دسترس.
          </motion.p>

          <motion.div
            {...rise(1.3)}
            className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <a href="#demo" className="btn-gold">
              درخواست
              <span aria-hidden>←</span>
            </a>
            <a href="#features" className="btn-ghost">
              آشنایی با امکانات
            </a>
          </motion.div>

          <motion.ul
            {...rise(1.5)}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-bone-faint lg:justify-start"
          >
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold/70" aria-hidden />
              ساخته‌شده برای خیاطی
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-gold/70" aria-hidden />
              تقویم شمسی
            </li>
            <li className="flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 text-gold/70" aria-hidden />
              بدون نیاز به دانش فنی
            </li>
          </motion.ul>
        </div>

        {/* نمایش بصری — کارت اصلی با کارت‌های نیمه‌پیدا از پشت */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: easeSilk }}
          className="relative mx-auto flex w-full max-w-[420px] flex-col items-center px-2 pb-12 pt-12 lg:max-w-[460px]"
          aria-label="پیش‌نمایش مفهومی از کارت سفارش در دوخت‌یار"
        >
          {/* کارت متریک — از گوشه بالا-راست پشت کارت اصلی بیرون می‌زند */}
          <motion.div
            style={reduce ? undefined : { y: yA }}
            className="absolute -top-1 right-0 z-0 rotate-2 lg:-top-3 lg:-right-2"
          >
            <div className={reduce ? "" : "animate-float-slow"}>
              <MetricCard />
            </div>
          </motion.div>

          {/* کارت سفارش اصلی */}
          <motion.div style={reduce ? undefined : { y: yB }} className="relative z-10 w-full max-w-[380px]">
            <OrderCard />
          </motion.div>

          {/* اعلان پرداخت — از گوشه پایین-چپ پشت کارت اصلی بیرون می‌زند */}
          <motion.div
            style={reduce ? undefined : { y: yA }}
            className="absolute bottom-0 left-0 z-0 -rotate-1 lg:-bottom-3 lg:-left-3"
          >
            <div className={reduce ? "" : "animate-float-slower"}>
              <PaymentToast />
            </div>
          </motion.div>

          {/* هاله پشت کارت */}
          <div
            className="pointer-events-none absolute inset-0 -z-20"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(214,180,106,0.10), transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
