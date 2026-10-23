import { Eye, HeartHandshake, LayoutList, Target } from "lucide-react";
import { Reveal, StitchDivider } from "./reveal";
import { SectionHeading } from "./section-heading";

const VALUES = [
  {
    icon: Target,
    title: "ساخته‌شده برای خیاطی، نه همه مشاغل",
    body: "دوخت‌یار ابزار همه‌کاره نیست؛ برای یک خیاطی واقعی طراحی شده: لباس، خدمت، تعرفه، برچسب لباس و موعد تحویل. برای همین چیزهای اضافه ندارد و یادگیریش ساده است.",
  },
  {
    icon: LayoutList,
    title: "نظم، بدون پیچیدگی",
    body: "هر سفارش، مشتری و پرداخت جای مشخصی دارد. بعد از چند روز استفاده، پیدا کردن اطلاعات سریع‌تر از ورق‌زدن دفتر است — و با گذشت زمان بهتر هم می‌شود.",
  },
  {
    icon: Eye,
    title: "اول می‌بینید، بعد تصمیم می‌گیرید",
    body: "قبل از هر تعهدی، دمو را می‌بینید و با برنامه کار می‌کنید. هیچ پنجره‌ای برای «اعتماد کور» باز نگذاشته‌ایم؛ تصمیم با شماست.",
  },
  {
    icon: HeartHandshake,
    title: "صادقانه، مثل یک همکار",
    body: "امکاناتی که این‌جا خوانده‌اید، در برنامه موجود است. درباره چیزهایی که به هماهنگی نیاز دارند — مثل نصب یا پیامک — شفاف حرف می‌زنیم، نه اغراق.",
  },
];

export function WhyDooghtyar() {
  return (
    <section id="why" className="relative py-16 sm:py-24" aria-labelledby="why-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index={5}
          eyebrow="چرا دوخت‌یار"
          title="دلایلی که می‌توانید خودتان امتحانشان کنید"
          description="آمار و رضایت‌سنجی‌های بزرگ نداریم که به رخ بکشیم؛ چهارتا ارزش روشن داریم که همه‌شان در دمو قابل بررسی است."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <article className="surface group h-full p-6 transition-colors duration-300 hover:border-gold/25">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold transition-colors duration-300 group-hover:border-gold/40">
                  <v.icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[16.5px] font-bold text-bone">{v.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-7 text-bone-muted">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <StitchDivider className="mt-16 sm:mt-24" />
    </section>
  );
}
