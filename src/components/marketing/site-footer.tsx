import { LogoMark } from "./icons";
import { NeedleThreadIcon } from "./icons";

const NAV = [
  { href: "#problems", label: "مسئله‌های شما" },
  { href: "#features", label: "امکانات" },
  { href: "#showcase", label: "نمایش برنامه" },
  { href: "#start", label: "نحوه شروع" },
  { href: "#why", label: "چرا دوخت‌یار" },
  { href: "#faq", label: "سؤالات متداول" },
  { href: "#demo", label: "درخواست" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* معرفی */}
          <div>
            <a href="#top" className="flex w-fit items-center gap-2.5" aria-label="دوخت‌یار">
              <LogoMark className="h-9 w-9" />
              <span className="text-[17px] font-bold text-bone">دوخت‌یار</span>
            </a>
            <p className="mt-4 max-w-sm text-[13px] leading-7 text-bone-muted">
              سامانه مدیریت سفارش خیاطی؛ ساخته‌شده برای خیاط‌ها و مزون‌ها تا مشتری‌ها،
              سفارش‌ها، پرداخت‌ها و موعد تحویل را منظم و یک‌جا مدیریت کنند.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-bone-faint">
              <NeedleThreadIcon className="h-4 w-4 text-gold/60" aria-hidden />
              ساخته‌شده با دقت، برای اهل دوخت.
            </p>
          </div>

          {/* لینک‌ها */}
          <nav aria-label="لینک‌های سایت">
            <h3 className="text-[13px] font-semibold text-bone">بخش‌های سایت</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[13px] text-bone-muted transition-colors hover:text-gold-light"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ارتباط */}
          <div>
            <h3 className="text-[13px] font-semibold text-bone">ارتباط با ما</h3>
            <p className="mt-4 text-[13px] leading-7 text-bone-muted">
              سریع‌ترین راه ارتباطی، ثبت درخواست از{" "}
              <a href="#demo" className="text-gold underline decoration-gold/30 underline-offset-4 hover:text-gold-light">
                فرم درخواست
              </a>{" "}
              است؛ برای هماهنگی با شما تماس می‌گیریم.
            </p>
            <p className="mt-4 text-[12px] leading-6 text-bone-faint">
              شماره تماس و راه‌های ارتباطی مستقیم، پس از ثبت درخواست در جلسه هماهنگی در
              اختیار شما قرار می‌گیرد.
            </p>
          </div>
        </div>

        <div className="hairline-gold mt-10" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="num text-[12px] text-bone-faint">© ۱۴۰۵ دوخت‌یار — همه حقوق محفوظ است.</p>
          <p className="text-[11.5px] text-bone-faint">
            این صفحه، معرفی محصول است؛ ورود به برنامه برای کاربران دوخت‌یار مسیر جداگانه دارد.
          </p>
        </div>
      </div>
    </footer>
  );
}
