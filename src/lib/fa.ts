/** تبدیل ارقام لاتین به فارسی برای نمایش. */
export function fa(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** قالب‌بندی مبلغ تومانی با جداکننده هزارگان و ارقام فارسی. */
export function faToman(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  return fa(grouped);
}
