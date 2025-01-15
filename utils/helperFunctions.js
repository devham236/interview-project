export function calcTotalCookingTime(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return 0;
  }

  return list.reduce((acc, item) => {
    return acc + (item.cookTimeMinutes || 0);
  }, 0);
}
