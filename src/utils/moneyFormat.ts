export function formatMoney(value: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(value);
}
