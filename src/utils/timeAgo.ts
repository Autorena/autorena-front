export const timeAgo = (dateString: string): string => {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffMs = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "сегодня";
  if (diffDays === 1) return "вчера";
  if (diffDays < 30)
    return `${diffDays} ${pluralize(diffDays, "день", "дня", "дней")} назад`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} ${pluralize(
      diffMonths,
      "месяц",
      "месяца",
      "месяцев"
    )} назад`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} ${pluralize(diffYears, "год", "года", "лет")} назад`;
};

const pluralize = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
};
