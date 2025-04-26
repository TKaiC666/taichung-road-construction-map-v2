// 民國 -> 西元 Date
export function parseROCDate(roc: string): Date {
  const year = 1911 + parseInt(roc.slice(0, 3), 10);
  const month = parseInt(roc.slice(3, 5), 10);
  const day = parseInt(roc.slice(5, 7), 10);

  return new Date(`${year}-${month}-${day}`);
}

// 是 / 否 -> boolean
export function parseBoolean(str: string): boolean {
  return str === "是";
}
