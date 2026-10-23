"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutDashboard, ClipboardList, UserRound, Wallet, ArrowLeft } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, StitchDivider } from "./reveal";
import {
  DashboardMockup,
  OrderWizardMockup,
  CustomerProfileMockup,
  PaymentsMockup,
} from "./mockups/app-screens";

const TABS = [
  {
    key: "dashboard",
    label: "داشبورد",
    icon: LayoutDashboard,
    title: "صبح کار را با یک نگاه شروع کنید",
    caption:
      "سفارش‌های امروز، آماده‌تحویل‌ها و سفارش‌های نزدیک به موعد، اول وقت جلوی چشم شماست. لازم نیست برگه‌ها را ورق بزنید؛ داشبورد می‌گوید امروز نوبت چیست.",
  },
  {
    key: "order",
    label: "سفارش جدید",
    icon: ClipboardList,
    title: "ثبت سفارش، چهار قدم ساده",
    caption:
      "مشتری را انتخاب می‌کنید، لباس و خدمت را می‌زنید، قیمت را همان‌جا اصلاح می‌کنید و ثبت می‌کنید. برچسب لباس و رسید چاپی هم آماده می‌شود.",
  },
  {
    key: "customer",
    label: "پرونده مشتری",
    icon: UserRound,
    title: "هر مشتری، یک پرونده مرتب",
    caption:
      "با یک جستجو به پرونده مشتری می‌رسید: سفارش‌های قبلی، پرداخت‌ها، مانده حساب و یادداشت‌های مهم — همه یک‌جا، بدون ورق‌زدن دفتر.",
  },
  {
    key: "payments",
    label: "پرداخت‌ها",
    icon: Wallet,
    title: "حساب‌ها، شفاف و به‌روز",
    caption:
      "پرداخت‌ها و بیعانه‌های روز را با روش پرداخت می‌بینید؛ مانده هر سفارش خودکار حساب می‌شود و رسید تحویل با QR صادر می‌شود.",
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tab = TABS[active];

  return (
    <section id="showcase" className="relative py-16 sm:py-24" aria-labelledby="showcase-title">
      {/* هاله پس‌زمینه */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(214,180,106,0.06), transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index={3}
          eyebrow="نمایش برنامه"
          title="خودِ برنامه را ببینید، نه فقط اسمش را"
          description="در هر تصویر می‌بینید کاربر در آن صفحه چه کاری انجام می‌دهد. این پیش‌نمایش‌ها بازسازی وفادار از رابط واقعی دوخت‌یار هستند — برای دیدن برنامه زنده، دمو بگیرید."
        />

        {/* تب‌ها */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="صفحات برنامه"
            className="mx-auto mt-9 flex w-fit max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/[0.07] bg-ink-900/80 p-1.5"
          >
            {TABS.map((t, i) => (
              <button
                key={t.key}
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.key}`}
                onClick={() => setActive(i)}
                className={`flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                  active === i
                    ? "bg-gold text-ink-950 shadow-[0_8px_24px_-10px_rgba(214,180,106,0.6)]"
                    : "text-bone-muted hover:bg-white/[0.05] hover:text-bone"
                }`}
              >
                <t.icon className="h-4 w-4" aria-hidden />
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* قاب نمایش */}
        <Reveal delay={0.15}>
          <div
            id={`panel-${tab.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.key}`}
            className="mx-auto mt-8 max-w-3xl"
          >
            <div className="surface overflow-hidden !p-0 shadow-lift">
              {/* نوار مرورگر */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-ink-900 px-4 py-2.5">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/40" />
                </div>
                <div className="flex flex-1 items-center justify-center rounded-md border border-white/[0.05] bg-ink-950/60 px-3 py-1">
                  <p className="num text-[11px] text-bone-faint">dooghtyar.local/{tab.key}</p>
                </div>
              </div>

              {/* محتوای صفحه */}
              <div className="relative h-[440px] sm:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab.key}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="h-full overflow-y-auto"
                  >
                    {tab.key === "dashboard" && <DashboardMockup />}
                    {tab.key === "order" && <OrderWizardMockup />}
                    {tab.key === "customer" && <CustomerProfileMockup />}
                    {tab.key === "payments" && <PaymentsMockup />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* توضیح تب فعال */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-center"
          >
            <h3 className="text-[17px] font-bold text-bone">{tab.title}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-bone-muted">{tab.caption}</p>
            <a
              href="#demo"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold transition-colors hover:text-gold-light"
            >
              می‌خواهم زنده ببینم
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <StitchDivider className="mt-16 sm:mt-24" />
    </section>
  );
}
