import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const vazirmatn = localFont({
  src: "../../public/fonts/Vazirmatn-Variable.woff2",
  variable: "--font-vazir",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "دوخت‌یار | سامانه مدیریت سفارش خیاطی",
    template: "%s | دوخت‌یار",
  },
  description:
    "دوخت‌یار به خیاطان کمک می‌کند مشتریان، سفارش‌های دوخت، لباس‌ها، پرداخت‌ها و موعد تحویل را منظم و یک‌جا مدیریت کنند. فارسی، راست‌چین و ساده — مخصوص خیاطی.",
  keywords: [
    "نرم‌افزار خیاطی",
    "مدیریت سفارش خیاطی",
    "دوخت‌یار",
    "برنامه مدیریت مزون",
    "خیاطی",
    "مدیریت مشتری خیاط",
  ],
  applicationName: "دوخت‌یار",
  authors: [{ name: "تیم دوخت‌یار" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "دوخت‌یار | مدیریت خیاطی، منظم‌تر از همیشه",
    description:
      "مشتری‌ها، سفارش‌ها، پرداخت‌ها و موعد تحویل — همه در یک نرم‌افزار ساده و فارسی، مخصوص خیاطی.",
    url: "/",
    siteName: "دوخت‌یار",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "دوخت‌یار — سامانه مدیریت سفارش خیاطی" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "دوخت‌یار | مدیریت خیاطی، منظم‌تر از همیشه",
    description: "نرم‌افزار مدیریت سفارش خیاطی — مشتری، سفارش، پرداخت و تحویل، همه یک‌جا.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-dvh font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
