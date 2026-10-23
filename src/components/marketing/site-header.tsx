"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { LogoMark } from "./icons";

const NAV = [
  { href: "#problems", label: "مسئله‌های شما" },
  { href: "#features", label: "امکانات" },
  { href: "#showcase", label: "نمایش برنامه" },
  { href: "#start", label: "نحوه شروع" },
  { href: "#faq", label: "سؤالات متداول" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // قفل اسکرول هنگام باز بودن منوی موبایل
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* لوگو */}
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="دوخت‌یار — صفحه اصلی"
        >
          <LogoMark className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-bold text-bone">دوخت‌یار</span>
            <span className="mt-1 text-[10.5px] text-bone-faint">سامانه مدیریت سفارش خیاطی</span>
          </span>
        </a>

        {/* ناوبری دسکتاپ */}
        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] text-bone-muted transition-colors duration-200 hover:bg-white/[0.04] hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="btn-gold !px-5 !py-2.5 !text-[13.5px]"
            aria-label="ثبت درخواست دوخت‌یار"
          >
            درخواست
          </a>

          {/* دکمه منوی موبایل */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-bone lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="ناوبری موبایل"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.05] bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] text-bone transition-colors hover:bg-white/[0.04]"
                  >
                    {item.label}
                    <ArrowLeft className="h-4 w-4 text-bone-faint" aria-hidden />
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href="#demo"
                  onClick={() => setOpen(false)}
                  className="btn-gold w-full"
                >
                  درخواست
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
