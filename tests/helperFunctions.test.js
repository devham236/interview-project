import { calcTotalCookingTime } from "../utils/helperFunctions";

describe("calcTotalCookingTime function works properly", () => {
  test("should return correct total time", () => {
    const wishList = [
      { cookTimeMinutes: 10 },
      { cookTimeMinutes: 20 },
      { cookTimeMinutes: 30 },
    ];
    const result = calcTotalCookingTime(wishList);
    expect(result).toBe(60);
  });

  test("should return 0 if given array is empty", () => {
    const wishList = [];
    const result = calcTotalCookingTime(wishList);
    expect(result).toBe(0);
  });

  test("should return zero when given array is not an array", () => {
    const wishList = "not an array";
    const result = calcTotalCookingTime(wishList);
    expect(result).toBe(0);
  });
});
