import { HelpCircle, Scissors, Wallet, Clock4, Users, SearchX } from "lucide-react";
import { Reveal, StitchDivider } from "./reveal";
import { SectionHeading } from "./section-heading";

const PROBLEMS = [
  {
    icon: Clock4,
    title: "«کدام سفارش تا کِی باید آماده شود؟»",
    body: "وقتی چند ده سفارش هم‌زمان در کار است، پیگیری موعد تحویل با حافظه و برگه‌های پراکنده سخت می‌شود و یک سفارش به‌سادگی از قلم می‌افتد.",
    help: "در دوخت‌یار هر سفارش کد یکتا و موعد تحویل مشخص دارد. داشبورد، سفارش‌های نزدیک به موعد را جلوی چشم شما می‌آورد و وضعیت هر کدام — از «ثبت‌شده» تا «آماده تحویل» — همیشه روشن است.",
  },
  {
    icon: Scissors,
    title: "«جزئیات هر لباس را کجا یادداشت کنم؟»",
    body: "رنگ، اندازه، عیبِ لباس یا اینکه برای این مشتری چه خدمتی لازم است؛ این جزئیات اگر جایی ثبت نشوند، موقع دوخت به مشکل تبدیل می‌شوند.",
    help: "برای هر قلم سفارش، نوع لباس و خدمت انتخاب می‌شود و توضیحاتی مثل رنگ، عیب و نکته کارگاهی کنار همان قلم ثبت می‌ماند — تا هر وقت لازم شد، همان‌جا ببینید.",
  },
  {
    icon: Wallet,
    title: "«حساب و کتاب مشتری‌ها دستم می‌گیرد»",
    body: "بیعانه، پرداخت‌های قسطی، تخفیف و مانده هر مشتری؛ وقتی این‌ها در چند دفتر نوشته شوند، بررسی حساب هر مشتری وقت‌گیر و پرخطاست.",
    help: "دوخت‌یار پرداخت، بیعانه و حتی بازگشت وجه را برای هر سفارش ثبت می‌کند و مانده حساب را خودش حساب می‌کند. رسید هم برای مشتری چاپ می‌شود.",
  },
  {
    icon: Users,
    title: "«شماره و مشخصات مشتری‌ها بین دفتر و گوشی گم می‌شود»",
    body: "مشتری تلفنی زنگ می‌زند و می‌پرسد «سفارشم شد؟» — اما پیدا کردن پرونده او و سفارش‌های قبلی‌اش، چند دقیقه ورق‌زدن می‌خواهد.",
    help: "هر مشتری با شماره موبایل یکتا ثبت می‌شود و سابقه سفارش‌ها و پرداخت‌هایش یک‌جا دیده می‌شود؛ کافی است شماره را جستجو کنید.",
  },
  {
    icon: SearchX,
    title: "«پیدا کردن یک سفارش قدیمی، وقت‌گیر است»",
    body: "مثلاً ماه پیش یک مانتو دوخته‌اید و مشتری الان مدلش را می‌خواهد؛ اما یادآوری جزئیات آن سفارش از دل برگه‌ها کار سختی است.",
    help: "با جستجوی سراسری دوخت‌یار، با کد سفارش، نام یا شماره مشتری، در چند ثانیه به سفارش و جزئیات کاملش می‌رسید.",
  },
];

export function Problems() {
  return (
    <section id="problems" className="relative py-16 sm:py-24" aria-labelledby="problems-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* ستون معرفی — در دسکتاپ چسبان */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index={1}
              eyebrow="مسئله‌های آشنا"
              title="اگر این‌ها برایتان آشناست، دوخت‌یار برای همین ساخته شده"
              description="شاید کارتان با این مشکل‌ها پیش می‌رود؛ شاید نه. اما اگر حتی یکی از این جمله‌ها برایتان آشناست، ادامه همین صفحه را ببینید."
              align="start"
            />
            <Reveal delay={0.15}>
              <div className="mt-6 flex items-center gap-3 rounded-xl2 border border-gold/20 bg-gold/[0.05] p-4">
                <HelpCircle className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                <p className="text-[13px] leading-6 text-bone-muted">
                  برای هر مسئله، راهی که دوخت‌یار در دسترس می‌گذارد را نوشته‌ایم — نه وعده، فقط
                  قابلیتی که واقعاً در برنامه هست.
                </p>
              </div>
            </Reveal>
          </div>

          {/* فهرست مسئله‌ها */}
          <ol className="flex flex-col gap-5">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="surface group p-5 transition-colors duration-300 hover:border-gold/25 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-bone-muted transition-colors duration-300 group-hover:border-gold/30 group-hover:text-gold">
                      <p.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold leading-7 text-bone">{p.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-7 text-bone-muted">{p.body}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border-r-2 border-gold/50 bg-gold/[0.04] px-4 py-3">
                    <p className="text-[12px] font-semibold text-gold">دوخت‌یار چطور کمک می‌کند؟</p>
                    <p className="mt-1.5 text-[13px] leading-7 text-bone">{p.help}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <StitchDivider className="mt-16 sm:mt-24" />
    </section>
  );
}
