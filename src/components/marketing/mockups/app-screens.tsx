import { CheckCircle2, CreditCard, Printer, Search, Smartphone, Wallet } from "lucide-react";
import { fa, faToman } from "@/lib/fa";

/* ═══════════ اجزای مشترک ماکت‌ها ═══════════ */

function AppTopBar({ page }: { page: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] bg-ink-900 px-3 py-2 sm:px-4">
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-bold text-gold sm:text-[13px]">دوخت‌یار</span>
        <span className="hidden text-[11px] text-bone-faint sm:inline">/ {page}</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-ink-850 px-2 py-1 text-[10px] text-bone-faint">
        <Search className="h-3 w-3" aria-hidden />
        <span className="hidden sm:inline">جستجو در سفارش‌ها و مشتری‌ها…</span>
        <span className="sm:hidden">جستجو…</span>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
  tone = "default",
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "default" | "gold" | "ok" | "warn";
}) {
  const cls =
    tone === "gold"
      ? "text-gold border-gold/25 bg-gold/[0.07]"
      : tone === "ok"
        ? "text-ok border-ok/25 bg-ok/[0.07]"
        : tone === "warn"
          ? "text-warn border-warn/25 bg-warn/[0.07]"
          : "text-bone-muted border-white/[0.07] bg-white/[0.03]";
  return (
    <div className="rounded-lg border border-white/[0.06] bg-ink-850 p-2.5 sm:p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[9.5px] text-bone-faint sm:text-[10.5px]">{label}</p>
          <p className="num mt-1.5 text-[16px] font-bold leading-none text-bone sm:text-[19px]">
            {value}
            {unit && <span className="mr-1 text-[9px] font-normal text-bone-faint">{unit}</span>}
          </p>
        </div>
        <span className={`h-2 w-2 shrink-0 rounded-full border ${cls}`} aria-hidden />
      </div>
    </div>
  );
}

function StatusChip({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[9.5px] sm:text-[10.5px] ${tone}`}>
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}

const TONES = {
  info: "text-info border-info/25 bg-info/[0.08]",
  neutral: "text-bone-muted border-white/[0.08] bg-white/[0.03]",
  warn: "text-warn border-warn/25 bg-warn/[0.08]",
  ok: "text-ok border-ok/25 bg-ok/[0.08]",
  gold: "text-gold border-gold/25 bg-gold/[0.07]",
  danger: "text-danger border-danger/25 bg-danger/[0.08]",
} as const;

/* ═══════════ ۱) داشبورد ═══════════ */

export function DashboardMockup() {
  const bars = [
    { d: "ش", v: 42 },
    { d: "ی", v: 58 },
    { d: "د", v: 35 },
    { d: "س", v: 76 },
    { d: "چ", v: 52 },
    { d: "پ", v: 90 },
    { d: "ج", v: 28 },
  ];
  return (
    <div className="flex h-full flex-col">
      <AppTopBar page="داشبورد" />
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:p-4">
        <Metric label="سفارش‌های امروز" value={fa(7)} tone="gold" />
        <Metric label="آماده تحویل" value={fa(2)} tone="ok" />
        <Metric label="نزدیک به موعد" value={fa(3)} tone="warn" />
        <Metric label="درآمد امروز" value={faToman(1240)} unit="هزار تومان" />
      </div>

      <div className="mx-3 mb-3 rounded-lg border border-white/[0.06] bg-ink-850 p-3 sm:mx-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium text-bone sm:text-[12px]">سفارش‌های هفته گذشته</p>
          <p className="num text-[10px] text-bone-faint">{fa(38)} سفارش</p>
        </div>
        <div className="mt-3 flex h-20 items-end gap-2 sm:h-24" role="img" aria-label="نمودار ستونی سفارش‌های هفته">
          {bars.map((b, i) => (
            <div key={b.d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <div
                className={`w-full rounded-sm ${i === 5 ? "bg-gradient-to-t from-gold-dark to-gold" : "bg-white/[0.10]"}`}
                style={{ height: `${b.v}%` }}
              />
              <span className="text-[9px] text-bone-faint">{b.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-3 mb-4 rounded-lg border border-white/[0.06] bg-ink-850 p-3 sm:mx-4">
        <p className="text-[11px] font-medium text-bone sm:text-[12px]">نزدیک به موعد تحویل</p>
        <ul className="mt-2 space-y-1.5">
          <li className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-2">
            <span className="flex items-center gap-2 text-[10.5px] text-bone sm:text-[11.5px]">
              <span className="num rounded border border-gold/20 bg-gold/[0.06] px-1.5 py-0.5 text-[9px] text-gold">
                {fa("DY-1038")}
              </span>
              مانتو — مریم حسینی
            </span>
            <span className="num text-[9.5px] text-warn sm:text-[10.5px]">موعد: فردا</span>
          </li>
          <li className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-2">
            <span className="flex items-center gap-2 text-[10.5px] text-bone sm:text-[11.5px]">
              <span className="num rounded border border-gold/20 bg-gold/[0.06] px-1.5 py-0.5 text-[9px] text-gold">
                {fa("DY-1040")}
              </span>
              کت زنانه — نگار موسوی
            </span>
            <span className="num text-[9.5px] text-danger sm:text-[10.5px]">موعد: امروز</span>
          </li>
          <li className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-2">
            <span className="flex items-center gap-2 text-[10.5px] text-bone sm:text-[11.5px]">
              <span className="num rounded border border-gold/20 bg-gold/[0.06] px-1.5 py-0.5 text-[9px] text-gold">
                {fa("DY-1035")}
              </span>
              شلوار — سعید احمدی
            </span>
            <span className="num text-[9.5px] text-warn sm:text-[10.5px]">موعد: ۲ روز بعد</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ═══════════ ۲) ثبت سفارش جدید ═══════════ */

export function OrderWizardMockup() {
  const steps = ["مشتری", "لباس و خدمات", "قیمت و پرداخت", "بازبینی و ثبت"];
  return (
    <div className="flex h-full flex-col">
      <AppTopBar page="سفارش جدید" />

      {/* مراحل */}
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-3 py-2.5 sm:gap-1.5 sm:px-4" role="img" aria-label="مراحل ثبت سفارش">
        {steps.map((s, i) => (
          <div key={s} className="flex min-w-0 items-center gap-1 sm:gap-1.5">
            <span
              className={`num flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9.5px] font-bold ${
                i < 2 ? "bg-gold text-ink-950" : "border border-white/[0.10] text-bone-faint"
              }`}
            >
              {i < 2 ? "✓" : fa(i + 1)}
            </span>
            <span className={`hidden truncate text-[10px] md:inline ${i <= 1 ? "text-bone" : "text-bone-faint"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <span className="text-bone-faint">—</span>}
          </div>
        ))}
      </div>

      {/* انتخاب لباس */}
      <div className="p-3 sm:p-4">
        <p className="text-[11px] text-bone-muted">کدام لباس را می‌خواهد؟</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["مانتو", "شلوار", "پیراهن", "کت زنانه", "دامن", "بلوز"].map((g) => (
            <span
              key={g}
              className={`rounded-full border px-2.5 py-1 text-[10.5px] ${
                g === "مانتو" || g === "شلوار"
                  ? "border-gold/40 bg-gold/[0.10] text-gold-light"
                  : "border-white/[0.08] bg-white/[0.03] text-bone-muted"
              }`}
            >
              {g}
            </span>
          ))}
        </div>

        {/* قلم سفارش */}
        <div className="mt-3 rounded-lg border border-white/[0.06] bg-ink-850 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-bold text-bone">مانتو</p>
            <div className="flex items-center gap-1.5" aria-label="تعداد">
              <span className="flex h-5 w-5 items-center justify-center rounded border border-white/[0.10] text-[11px] text-bone">+</span>
              <span className="num w-5 text-center text-[11px] text-bone">{fa(1)}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded border border-white/[0.10] text-[11px] text-bone-faint">−</span>
            </div>
          </div>
          <ul className="mt-2 space-y-1.5">
            <li className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-1.5">
              <span className="text-[10.5px] text-bone">تعمیر آستین</span>
              <span className="num text-[10.5px] text-bone-muted">{faToman(180000)}</span>
            </li>
            <li className="flex items-center justify-between rounded-md border border-dashed border-gold/25 px-2.5 py-1.5">
              <span className="text-[10.5px] text-gold-light">+ افزودن خدمت</span>
              <span className="text-[9.5px] text-bone-faint">از تعرفه‌ها</span>
            </li>
          </ul>
          <p className="mt-2 text-[9.5px] text-bone-faint">
            توضیح قلم: رنگ مشکی — آستین چپ کوتاه است
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-white/[0.06] bg-ink-900 px-3 py-2.5">
          <span className="text-[11px] text-bone-muted">جمع کل تا اینجا</span>
          <span className="num text-[13px] font-bold text-gold">{faToman(300000)} تومان</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] px-3 py-2.5 sm:px-4">
        <span className="text-[10.5px] text-bone-faint">مرحله بعد: قیمت و پرداخت</span>
        <span className="rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold text-ink-950">ادامه ←</span>
      </div>
    </div>
  );
}

/* ═══════════ ۳) پرونده مشتری ═══════════ */

export function CustomerProfileMockup() {
  return (
    <div className="flex h-full flex-col">
      <AppTopBar page="مشتریان" />

      <div className="flex items-center gap-3 border-b border-white/[0.06] p-3 sm:p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-[13px] font-bold text-gold">
          م
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-bone">مریم حسینی</p>
          <p className="num mt-0.5 text-[10.5px] text-bone-faint" dir="ltr" style={{ textAlign: "right" }}>
            ۰۹۳۵ ۲۲۱ ۸۸۷۴
          </p>
        </div>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9.5px] text-bone-faint">
          از تیر ۱۴۰۴
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 sm:p-4">
        <Metric label="سفارش‌ها" value={fa(4)} tone="gold" />
        <Metric label="پرداختی" value={faToman(840)} unit="هزار" tone="ok" />
        <Metric label="مانده حساب" value={faToman(0)} unit="تومان" />
      </div>

      <div className="px-3 sm:px-4">
        <div className="flex gap-1.5 border-b border-white/[0.06]" role="tablist" aria-label="سابقه مشتری">
          <span className="rounded-t-md border-b-2 border-gold px-3 py-1.5 text-[11px] font-medium text-gold">سفارش‌ها</span>
          <span className="px-3 py-1.5 text-[11px] text-bone-faint">پرداخت‌ها</span>
        </div>
        <ul className="mt-2.5 space-y-1.5 pb-4">
          <li className="flex items-center justify-between rounded-md border border-white/[0.06] bg-ink-850 px-2.5 py-2">
            <span className="flex items-center gap-2 text-[10.5px] text-bone sm:text-[11.5px]">
              <span className="num text-[9px] text-bone-faint">{fa("DY-1038")}</span>
              مانتو — تعمیر آستین
            </span>
            <StatusChip label="آماده تحویل" tone={TONES.ok} />
          </li>
          <li className="flex items-center justify-between rounded-md border border-white/[0.06] bg-ink-850 px-2.5 py-2">
            <span className="flex items-center gap-2 text-[10.5px] text-bone sm:text-[11.5px]">
              <span className="num text-[9px] text-bone-faint">{fa("DY-1021")}</span>
              کت زنانه — آسترکشی
            </span>
            <StatusChip label="تحویل‌شده" tone={TONES.gold} />
          </li>
          <li className="flex items-center justify-between rounded-md border border-white/[0.06] bg-ink-850 px-2.5 py-2">
            <span className="flex items-center gap-2 text-[10.5px] text-bone sm:text-[11.5px]">
              <span className="num text-[9px] text-bone-faint">{fa("DY-0996")}</span>
              شلوار — کوتاه‌کردن
            </span>
            <StatusChip label="تحویل‌شده" tone={TONES.gold} />
          </li>
        </ul>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] px-3 py-2.5 text-[10px] text-bone-faint sm:px-4">
        <Smartphone className="h-3.5 w-3.5 text-gold/70" aria-hidden />
        یادداشت: مشتری حساسیت به یراق فلزی دارد
      </div>
    </div>
  );
}

/* ═══════════ ۴) پرداخت‌ها ═══════════ */

export function PaymentsMockup() {
  return (
    <div className="flex h-full flex-col">
      <AppTopBar page="پرداخت‌ها" />

      <div className="grid grid-cols-2 gap-2 p-3 sm:p-4">
        <Metric label="دریافتی امروز" value={faToman(740)} unit="هزار تومان" tone="gold" />
        <Metric label="بیعانه‌های در جریان" value={faToman(250)} unit="هزار تومان" />
      </div>

      <div className="flex gap-1.5 px-3 sm:px-4" aria-label="فیلتر روش پرداخت">
        {["همه", "نقدی", "کارت", "انتقالی"].map((m, i) => (
          <span
            key={m}
            className={`rounded-full border px-2.5 py-1 text-[10px] ${
              i === 0 ? "border-gold/40 bg-gold/[0.10] text-gold-light" : "border-white/[0.08] bg-white/[0.03] text-bone-muted"
            }`}
          >
            {m}
          </span>
        ))}
      </div>

      <ul className="mt-3 space-y-1.5 px-3 pb-4 sm:px-4">
        <li className="flex items-center gap-2.5 rounded-md border border-white/[0.06] bg-ink-850 px-2.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ok/25 bg-ok/[0.08] text-ok">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="num text-[11px] font-bold text-bone">{faToman(300000)} تومان</p>
            <p className="num text-[9.5px] text-bone-faint">{fa("DY-1039")} — نگار موسوی</p>
          </div>
          <span className="flex items-center gap-1 text-[9.5px] text-bone-muted">
            <CreditCard className="h-3 w-3" aria-hidden /> کارت
          </span>
        </li>
        <li className="flex items-center gap-2.5 rounded-md border border-white/[0.06] bg-ink-850 px-2.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-gold">
            <Wallet className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="num text-[11px] font-bold text-bone">بیعانه {faToman(100000)}</p>
            <p className="num text-[9.5px] text-bone-faint">{fa("DY-1040")} — سعید احمدی</p>
          </div>
          <span className="text-[9.5px] text-bone-muted">نقدی</span>
        </li>
        <li className="flex items-center gap-2.5 rounded-md border border-white/[0.06] bg-ink-850 px-2.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-danger/25 bg-danger/[0.08] text-danger">
            <Printer className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="num text-[11px] font-bold text-bone">رسید تحویل — {faToman(240000)}</p>
            <p className="num text-[9.5px] text-bone-faint">{fa("DY-1032")} — با QR رسید</p>
          </div>
          <span className="text-[9.5px] text-ok">تسویه کامل</span>
        </li>
      </ul>
    </div>
  );
}
