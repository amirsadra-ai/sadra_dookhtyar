"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  MonitorPlay,
  PhoneCall,
  Wrench,
  User,
  Smartphone,
  MapPin,
  Briefcase,
  MessageSquare,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { buildSmsBody, buildSmsUrl } from "@/lib/sms";
import { Reveal } from "./reveal";

/* ── کانال دریافت درخواست‌ها: پیامک ── */

/** شماره گیرنده درخواست‌ها (۰۹۳۳۰۵۹۲۴۱۲) */
const OWNER_SMS_NUMBER = "+989330592412";
/** شماره گیرنده برای نمایش در صفحه */
const OWNER_SMS_NUMBER_FA = "۰۹۳۳ ۰۵۹ ۲۴۱۲";

/* ── اعتبارسنجی ── */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function normalizeDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (d) => {
    const p = PERSIAN_DIGITS.indexOf(d);
    if (p > -1) return String(p);
    return String(ARABIC_DIGITS.indexOf(d));
  });
}

function validate(fullName: string, mobile: string) {
  const errors: { fullName?: string; mobile?: string } = {};
  if (fullName.trim().length < 3) {
    errors.fullName = "لطفاً نام و نام خانوادگی را کامل وارد کنید.";
  }
  const m = normalizeDigits(mobile).replace(/[\s-()]/g, "");
  const normalized = m.replace(/^\+98|^0098|^98/, "0");
  if (!/^09\d{9}$/.test(normalized)) {
    errors.mobile = "شماره موبایل معتبر نیست؛ مثلاً ۰۹۱۲۳۴۵۶۷۸۹";
  }
  return { errors, normalizedMobile: normalized };
}

/* ── گزینه‌های فرم ── */

const REQUEST_TYPES = [
  {
    key: "DEMO",
    label: "درخواست دمو",
    hint: "برنامه را زنده می‌بینم",
    icon: MonitorPlay,
  },
  {
    key: "CONSULT",
    label: "مشاوره",
    hint: "سؤال دارم، راهنمایی می‌خواهم",
    icon: PhoneCall,
  },
  {
    key: "INSTALL",
    label: "نصب و راه‌اندازی",
    hint: "برای شروع استفاده آماده‌ام",
    icon: Wrench,
  },
];

const ACTIVITY_TYPES = ["خیاط مستقل", "مزون", "کارگاه دوخت", "خدمات تعمیر لباس", "سایر"];

const inputCls =
  "w-full min-h-[46px] rounded-xl border border-ink-600 bg-ink-900 px-4 py-2.5 text-[14px] text-bone placeholder:text-bone-faint transition-colors duration-200 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20";

/* ── ابزارهای ارسال با پیامک ── */

/**
 * باز کردن برنامه پیامک گوشی با متن آماده (سازگار با iOS و اندروید).
 * ساخت پیوند و کدگذاری متن در src/lib/sms.ts انجام می‌شود.
 * هیچ پیامکی خودکار ارسال نمی‌شود؛ فقط کادر نوشتن پیامک با متن پر می‌شود.
 */
function openSmsApp(body: string) {
  if (typeof window === "undefined") return;
  const ua = navigator.userAgent ?? "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const url = buildSmsUrl(OWNER_SMS_NUMBER, body, isIOS);
  try {
    // کلیک روی پیوند پنهان داخل همین رخداد کاربر — مطمئن‌ترین راه باز شدن برنامه پیامک
    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    try {
      window.location.href = url;
    } catch {
      // باز شدن برنامه پیامک ممکن نشد؛ صفحه موفقیت راهنمای کپی دستی دارد
    }
  }
}

export function DemoCta() {
  const reduce = useReducedMotion();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [requestType, setRequestType] = useState("DEMO");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ fullName?: string; mobile?: string }>({});
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  const [copied, setCopied] = useState(false);
  const smsBodyRef = useRef("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { errors: errs } = validate(fullName, mobile);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // فوکوس روی اولین خطا
      const first = errs.fullName ? "lead-name" : "lead-mobile";
      document.getElementById(first)?.focus();
      return;
    }

    // ۱) ساخت متن پیامک از اطلاعات فرم (فیلدهای خالی حذف می‌شوند)
    const body = buildSmsBody({
      fullName,
      requestType,
      city,
      activityType: activity,
      message,
    });
    smsBodyRef.current = body;
    setCopied(false);

    // ۲) باز کردن برنامه پیامک گوشی — کاربر فقط «ارسال» را می‌زند
    openSmsApp(body);
    setStatus("ok");
  }

  function reopenSms() {
    if (smsBodyRef.current) openSmsApp(smsBodyRef.current);
  }

  async function copySmsBody() {
    if (!smsBodyRef.current) return;
    try {
      await navigator.clipboard.writeText(smsBodyRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // دسترسی کلیپ‌بورد نبود — بی‌خیال
    }
  }

  function reset() {
    setFullName("");
    setMobile("");
    setCity("");
    setActivity("");
    setRequestType("DEMO");
    setMessage("");
    setErrors({});
    setStatus("idle");
    setCopied(false);
  }

  return (
    <section id="demo" className="relative py-16 sm:py-24" aria-labelledby="demo-title">
      {/* هاله طلایی */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(214,180,106,0.07), transparent 65%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        {/* متن دعوت نهایی */}
        <Reveal>
          <p className="flex items-center gap-2 text-[13px] font-medium text-gold">
            <span className="num rounded-full border border-gold/25 bg-gold/[0.07] px-2.5 py-0.5 text-[12px] leading-5">
              ۰۷
            </span>
            قدم بعدی
          </p>
          <h2
            id="demo-title"
            className="mt-3 text-balance text-[26px] font-black leading-[1.45] text-bone sm:text-[34px]"
          >
            ببینید، محک بزنید،
            <br />
            <span className="text-gold-light">بعد تصمیم بگیرید.</span>
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-[14.5px] leading-8 text-bone-muted">
            فرم را پر کنید و دکمه ثبت را بزنید؛ برنامه پیامک گوشی‌تان باز می‌شود و
            متن درخواست آماده است — فقط ارسال را بزنید. اگر هنوز مطمئن نیستید
            دوخت‌یار به کار شما می‌آید، «مشاوره» را انتخاب کنید — بدون هیچ تعهدی،
            درباره نیاز خیاطی‌تان حرف می‌زنیم.
          </p>

          <ul className="mt-6 space-y-3.5">
            {[
              {
                icon: MessageSquare,
                text: "متن درخواست به‌صورت پیامک آماده می‌شود؛ فقط دکمه ارسال را می‌زنید.",
              },
              {
                icon: PhoneCall,
                text: "بعد از دریافت پیامک، برای هماهنگی با شما تماس می‌گیریم.",
              },
              {
                icon: MonitorPlay,
                text: "در دمو، برنامه را با مثال‌های کار خیاطی خودتان می‌بینید.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gold/[0.06] text-gold">
                  <item.icon className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-[13.5px] leading-7 text-bone">{item.text}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[12px] leading-6 text-bone-faint">
            شماره یا ایمیلی نمی‌خواهیم که اسپم کنیم؛ فقط برای هماهنگیِ همین درخواست با شما
            تماس می‌گیریم.
          </p>
        </Reveal>

        {/* کارت فرم */}
        <Reveal delay={0.12}>
          <div className="surface relative overflow-hidden p-5 sm:p-7" dir="rtl">
            {/* نخ تزئینی بالای کارت */}
            <div className="stitch-line absolute inset-x-0 top-0" aria-hidden="true" />

            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                  className="flex flex-col items-center py-8 text-center"
                  role="status"
                >
                  <motion.span
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-ok/30 bg-ok/[0.10] text-ok"
                  >
                    <MessageSquare className="h-8 w-8" aria-hidden />
                  </motion.span>
                  <h3 className="mt-5 text-[19px] font-bold text-bone">
                    پیامک درخواست آماده شد
                  </h3>
                  <p className="mt-2.5 max-w-sm text-[13.5px] leading-7 text-bone-muted">
                    برنامه پیامک گوشی‌تان باز می‌شود و متن درخواست نوشته‌شده است؛
                    فقط دکمه ارسال را بزنید تا درخواستتان برای ما بیاید.
                  </p>

                  <div className="mt-5 w-full space-y-2.5">
                    <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-ink-900 px-4 py-3">
                      <span className="text-[12px] text-bone-faint">گیرنده پیامک</span>
                      <span className="num text-[14px] font-semibold text-bone" dir="ltr">
                        {OWNER_SMS_NUMBER_FA}
                      </span>
                    </div>
                    <div className="rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3">
                      <span className="block text-[12px] leading-6 text-bone-muted">
                        متن پیامک از روی همین فرم ساخته شده؛ قبل از ارسال می‌توانید آن را
                        در برنامه پیامک بررسی و اصلاح کنید.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={reopenSms}
                      className="btn-gold flex-1 !px-4 !py-2.5 !text-[13.5px]"
                    >
                      <Send className="h-4 w-4" aria-hidden />
                      باز کردن دوباره پیامک
                    </button>
                    <button
                      type="button"
                      onClick={copySmsBody}
                      className="btn-ghost flex-1 !px-4 !py-2.5 !text-[13.5px]"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-ok" aria-hidden />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden />
                      )}
                      {copied ? "متن کپی شد" : "کپی متن پیامک"}
                    </button>
                  </div>

                  <p className="mt-4 max-w-sm text-[11.5px] leading-6 text-bone-faint">
                    اگر برنامه پیامک باز نشد، دکمه «باز کردن دوباره پیامک» را بزنید یا متن
                    کپی‌شده را دستی به شماره گیرنده بفرستید.
                  </p>

                  <button
                    type="button"
                    onClick={reset}
                    className="btn-ghost mt-5 !px-5 !py-2 !text-[12.5px]"
                  >
                    ثبت درخواست جدید
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={false}
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="فرم درخواست دمو، مشاوره یا نصب دوخت‌یار"
                >
                  <h3 className="text-[17px] font-bold text-bone">فرم درخواست</h3>
                  <p className="mt-1 text-[12.5px] text-bone-faint">
                    فقط دو فیلد اول اجباری است.
                  </p>

                  {/* نوع درخواست */}
                  <fieldset className="mt-5">
                    <legend className="mb-2 text-[13px] font-medium text-bone-muted">
                      چه درخواستی دارید؟
                    </legend>
                    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="نوع درخواست">
                      {REQUEST_TYPES.map((t) => (
                        <button
                          key={t.key}
                          type="button"
                          role="radio"
                          aria-checked={requestType === t.key}
                          onClick={() => setRequestType(t.key)}
                          className={`flex min-h-[70px] flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all duration-200 ${
                            requestType === t.key
                              ? "border-gold/50 bg-gold/[0.08] text-gold-light"
                              : "border-ink-600 bg-ink-900 text-bone-muted hover:border-gold/25"
                          }`}
                        >
                          <t.icon className="h-4.5 w-4.5" aria-hidden />
                          <span className="text-[12px] font-semibold leading-5">{t.label}</span>
                          <span className="hidden text-[10px] leading-4 text-bone-faint sm:block">
                            {t.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* نام + موبایل */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="lead-name" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-bone-muted">
                        <User className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                        نام و نام خانوادگی <span className="text-danger">*</span>
                      </label>
                      <input
                        id="lead-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                        }}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "lead-name-error" : undefined}
                        placeholder="مثلاً: زهرا محمدی"
                        className={`${inputCls} ${errors.fullName ? "!border-danger/60" : ""}`}
                      />
                      {errors.fullName && (
                        <p id="lead-name-error" role="alert" className="mt-1.5 text-[11.5px] text-danger">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lead-mobile" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-bone-muted">
                        <Smartphone className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                        شماره موبایل <span className="text-danger">*</span>
                      </label>
                      <input
                        id="lead-mobile"
                        name="mobile"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        dir="ltr"
                        style={{ textAlign: "right" }}
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          if (errors.mobile) setErrors((p) => ({ ...p, mobile: undefined }));
                        }}
                        aria-invalid={!!errors.mobile}
                        aria-describedby={errors.mobile ? "lead-mobile-error" : undefined}
                        placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                        className={`${inputCls} num ${errors.mobile ? "!border-danger/60" : ""}`}
                      />
                      {errors.mobile && (
                        <p id="lead-mobile-error" role="alert" className="mt-1.5 text-[11.5px] text-danger">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* شهر + فعالیت */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="lead-city" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-bone-muted">
                        <MapPin className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                        شهر <span className="text-bone-faint">(اختیاری)</span>
                      </label>
                      <input
                        id="lead-city"
                        name="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="مثلاً: تهران"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-activity" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-bone-muted">
                        <Briefcase className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                        نوع فعالیت <span className="text-bone-faint">(اختیاری)</span>
                      </label>
                      <select
                        id="lead-activity"
                        name="activityType"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className={`${inputCls} ${activity ? "" : "text-bone-faint"}`}
                      >
                        <option value="">انتخاب کنید…</option>
                        {ACTIVITY_TYPES.map((a) => (
                          <option key={a} value={a} className="bg-ink-900 text-bone">
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* توضیحات */}
                  <div className="mt-4">
                    <label htmlFor="lead-message" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-bone-muted">
                      <MessageSquare className="h-3.5 w-3.5 text-gold/70" aria-hidden />
                      توضیحات <span className="text-bone-faint">(اختیاری)</span>
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      maxLength={1000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="مثلاً: روزها مغازه دارم و پرسنلی دارم؛ می‌خواهم سفارش‌ها و حساب مشتری‌ها را منظم کنم."
                      className={`${inputCls} resize-none leading-7`}
                    />
                  </div>

                  <button type="submit" className="btn-gold mt-6 w-full min-h-[48px]">
                    ثبت درخواست
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-5 text-bone-faint">
                    با زدن دکمه ثبت، برنامه پیامک گوشی‌تان باز می‌شود؛ پیامک بدون شما
                    ارسال نمی‌شود و ارسال نهایی با شماست.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
