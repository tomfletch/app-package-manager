export function serializable(result: any): any {
  return JSON.parse(JSON.stringify(result));
}

const SECONDS_PER_DAY    = 60*60*24;
const SECONDS_PER_HOUR   = 60*60;
const SECONDS_PER_MINUTE = 60;

export function dateToAgo(date: Date): string {
  const formatter = new Intl.RelativeTimeFormat('en');
  const seconds = (Date.now() - date.getTime()) / 1000;

  if (seconds > SECONDS_PER_DAY) {
    return formatter.format(-Math.round(seconds / SECONDS_PER_DAY), "days");
  }

  if (seconds > SECONDS_PER_HOUR) {
    return formatter.format(-Math.round(seconds / SECONDS_PER_HOUR), "hours");
  }

  if (seconds > SECONDS_PER_MINUTE) {
    return formatter.format(-Math.round(seconds / SECONDS_PER_MINUTE), "minutes");
  }

  return "Just now"
}
