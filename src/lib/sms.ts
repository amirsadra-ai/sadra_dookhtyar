/* ─────────────────────────────────────────────────────────────
   دوخت‌یار — ساخت متن پیامک درخواست و پیوند «sms:»
   ماژول کاملاً خالص (بدون React/Window) تا هم در سایت و هم در
   تست‌های خودکار بدون بکاند قابل استفاده باشد.
   ───────────────────────────────────────────────────────────── */

/** ورودی فرم درخواست — همه فیلدها به‌جز نام و نوع درخواست اختیاری‌اند */
export type SmsRequestInput = {
  fullName: string;
  requestType: string; // "DEMO" | "CONSULT" | "INSTALL"
  city?: string;
  activityType?: string;
  message?: string;
};

/**
 * جمله دقیق هر نوع درخواست — عمداً ثابت نگه داشته شده است
 * تا انتخاب کاربر بدون تغییر معنایی در پیامک بنشیند.
 */
const REQUEST_TYPE_SENTENCES: Record<string, string> = {
  DEMO: "برای درخواست دمو و آشنایی با امکانات نرم‌افزار پیام می‌دهم.",
  CONSULT: "برای دریافت مشاوره دربارهٔ نرم‌افزار پیام می‌دهم.",
  INSTALL: "برای نصب و راه‌اندازی نرم‌افزار پیام می‌دهم.",
};

/** پاک‌سازی فیلدهای تک‌خطی: بدون undefined/null، بدون فاصله‌های اضافه */
function cleanOneLine(value: string | undefined | null): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

/**
 * پاک‌سازی توضیحات چندخطی — خطوط حفظ می‌شود، فقط فاصله‌های
 * اضافی و بیش از دو خط خالی متوالی مرتب می‌شود؛ معنا دست‌نخورده می‌ماند.
 */
function cleanMultiline(value: string | undefined | null): string {
  return (value ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t\u00a0]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * ساخت متن نهایی پیامک بر اساس الگوی مصوب:
 *
 *   سلام، وقت بخیر.
 *   من {نام} هستم، از شهر {شهر}.        ← اگر شهر خالی بود، فقط «من … هستم.»
 *
 *   از طریق سایت دوختیار با این نرم‌افزار آشنا شدم و {جمله نوع درخواست}
 *
 *   {زمینه فعالیت — فقط اگر وارد شده باشد}
 *
 *   توضیحات من:                          ← فقط اگر توضیحات وارد شده باشد
 *   {متن کاربر بدون حذف یا تغییر معنا}
 *
 *   لطفاً برای ادامه و راهنمایی در این زمینه با من هماهنگ کنید.
 *   با تشکر
 *
 * شماره موبایل عمداً در متن نمی‌آید (گیرنده آن را از خودِ پیامک می‌بیند).
 */
export function buildSmsBody(input: SmsRequestInput): string {
  const name = cleanOneLine(input.fullName);
  const city = cleanOneLine(input.city);
  const activity = cleanOneLine(input.activityType);
  const description = cleanMultiline(input.message);
  const typeSentence =
    REQUEST_TYPE_SENTENCES[input.requestType] ?? REQUEST_TYPE_SENTENCES.DEMO;

  const blocks: string[] = [];

  // ۱) سلام و معرفی — جمله شهر فقط در صورت وارد بودن شهر
  blocks.push(
    city
      ? `سلام، وقت بخیر.\nمن ${name} هستم، از شهر ${city}.`
      : `سلام، وقت بخیر.\nمن ${name} هستم.`
  );

  // ۲) آشنایی با سایت + نوع درخواست دقیقاً مطابق انتخاب کاربر
  blocks.push(
    `از طریق سایت دوختیار با این نرم‌افزار آشنا شدم و ${typeSentence}`
  );

  // ۳) نوع فعالیت — فقط در صورت انتخاب
  if (activity) blocks.push(`زمینهٔ فعالیت من ${activity} است.`);

  // ۴) توضیحات کاربر — با عنوان و با حفظ کامل متن
  if (description) blocks.push(`توضیحات من:\n${description}`);

  // ۵) پایان‌بندی
  blocks.push(
    "لطفاً برای ادامه و راهنمایی در این زمینه با من هماهنگ کنید.\nبا تشکر"
  );

  return blocks.join("\n\n");
}

/**
 * ساخت پیوند «sms:» با بدنهٔ پیش‌پرشده.
 * - iOS بدنه را بعد از «&» می‌گیرد، اندروید و بقیه بعد از «؟».
 * - متن با encodeURIComponent کد می‌شود: حروف فارسی، نیم‌فاصله (U+200C)،
 *   فاصله و خط جدید (%0A) به‌درستی منتقل می‌شوند.
 * - ارسال به‌صورت خودکار انجام نمی‌شود؛ «sms:» فقط برنامه پیامک را
 *   با متن آماده باز می‌کند و دکمه ارسال با کاربر است.
 */
export function buildSmsUrl(recipient: string, body: string, isIOS: boolean): string {
  const sep = isIOS ? "&" : "?";
  return `sms:${recipient}${sep}body=${encodeURIComponent(body)}`;
}
