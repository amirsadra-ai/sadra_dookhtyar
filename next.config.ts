import type { NextConfig } from "next";

/**
 * دوخت‌یار — وب‌سایت معرفی
 *
 * - اجرای عادی (سرور):            next build  → خروجی standalone
 * - نسخه استاتیک برای GitHub Pages و هر هاست سادهٔ دیگر:
 *     STATIC_EXPORT=1 next build  → خروجی در پوشهٔ out/
 * - اگر سایت زیر زیرمسیر منتشر شود (مثلاً username.github.io/dokhtyar/)
 *   هنگام بیلد استاتیک NEXT_PUBLIC_BASE_PATH=/dokhtyar را هم بدهید.
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
