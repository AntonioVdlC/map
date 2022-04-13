import { describe, it, expect } from "vitest";

import { select, pick } from "../src";

describe("select", () => {
  it("is a function", () => {
    expect(typeof select).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof select("")).toBe("function");
  });

  it("selects a value by key in an array of objects", () => {
    const arr = [
      { name: "Bob", age: 23 },
      { name: "Alice", age: 32 },
      { name: "Tom", age: 60 },
      { name: "Candice", age: 45 },
    ];

    const expected = [23, 32, 60, 45];
    const actual = arr.map(select("age"));

    expect(actual).toEqual(expected);
  });

  it("selects a value by key in an array of objects (with null values)", () => {
    const arr = [
      { name: "Bob", age: 23 },
      { name: "Alice", age: 32 },
      { name: "Tom", age: 60 },
      null,
      { name: "Candice", age: 45 },
    ];

    const expected = [23, 32, 60, null, 45];
    // @ts-expect-error
    const actual = arr.map(select("age"));

    expect(actual).toEqual(expected);
  });

  it("selects a value by key in an array of objects (nested)", () => {
    const arr = [
      { name: { first: "Bob" }, age: 23 },
      { name: { first: "Alice" }, age: 32 },
      { name: { first: "Tom" }, age: 60 },
      { name: { first: "Candice" }, age: 45 },
    ];

    const expected = ["Bob", "Alice", "Tom", "Candice"];
    const actual = arr.map(select("name.first"));

    expect(actual).toEqual(expected);
  });

  it("returns an array of `null` if not an array of objects", () => {
    const arr = [1, 2, 3];
    // @ts-expect-error
    expect(arr.map(select(""))).toEqual([null, null, null]);
  });

  it("returns an array of `null` if key is not found in an array of objects", () => {
    const arr = [
      { name: "Bob", age: 23 },
      { name: "Alice", age: 32 },
      { name: "Tom", age: 60 },
      { name: "Candice", age: 45 },
    ];

    const expected = [null, null, null, null];
    const actual = arr.map(select("notfound"));

    expect(actual).toEqual(expected);
  });
});

describe("pick", () => {
  it("is a function", () => {
    expect(typeof pick).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof pick("")).toBe("function");
  });

  it("selects a value by key in an array of objects", () => {
    const arr = [
      { name: "Bob", age: 23 },
      { name: "Alice", age: 32 },
      { name: "Tom", age: 60 },
      { name: "Candice", age: 45 },
    ];

    const expected = [{ age: 23 }, { age: 32 }, { age: 60 }, { age: 45 }];
    const actual = arr.map(pick("age"));

    expect(actual).toEqual(expected);
  });

  it("selects a value by key in an array of objects (nested)", () => {
    const arr = [
      { name: { first: "Bob", last: "Garcia" }, age: 23 },
      { name: { first: "Alice", last: "Doe" }, age: 32 },
      { name: { first: "Tom", last: "Dupont" }, age: 60 },
      { name: { first: "Candice", last: "Smith" }, age: 45 },
    ];

    const expected = [
      { name: { first: "Bob" }, age: 23 },
      { name: { first: "Alice" }, age: 32 },
      { name: { first: "Tom" }, age: 60 },
      { name: { first: "Candice" }, age: 45 },
    ];
    const actual = arr.map(pick("name.first", "age"));

    expect(actual).toEqual(expected);
  });

  it("selects a value by key in an array of objects (deeply nested)", () => {
    const arr = [
      {
        name: { first: "Bob", last: "Garcia" },
        age: { value: 23, date: { year: 1999, month: 3 } },
      },
      {
        name: { first: "Alice", last: "Doe" },
        age: { value: 32, date: { year: 1990, month: 1 } },
      },
      {
        name: { first: "Tom", last: "Dupont" },
        age: { value: 60, date: { year: 1962, month: 10 } },
      },
      {
        name: { first: "Candice", last: "Smith" },
        age: { value: 45, date: { year: 1977, month: 8 } },
      },
    ];

    const expected = [
      { name: { first: "Bob" }, age: { date: { year: 1999 } } },
      { name: { first: "Alice" }, age: { date: { year: 1990 } } },
      { name: { first: "Tom" }, age: { date: { year: 1962 } } },
      { name: { first: "Candice" }, age: { date: { year: 1977 } } },
    ];
    const actual = arr.map(pick("name.first", "age.date.year"));

    expect(actual).toEqual(expected);
  });

  it("picks a value by key in an array of objects (with null values)", () => {
    const arr = [
      { name: "Bob", age: 23 },
      { name: "Alice", age: 32 },
      { name: "Tom", age: 60 },
      null,
      { name: "Candice", age: 45 },
    ];

    const expected = [{ age: 23 }, { age: 32 }, { age: 60 }, null, { age: 45 }];
    // @ts-expect-error
    const actual = arr.map(pick("age"));

    expect(actual).toEqual(expected);
  });

  it("returns an array of `null` if not an array of objects", () => {
    const arr = [1, 2, 3];
    // @ts-expect-error
    expect(arr.map(pick(""))).toEqual([null, null, null]);
  });

  it("ignore key if key not found in an array of objects", () => {
    const arr = [
      { name: { first: "Bob", last: "Garcia" }, age: 23 },
      { name: { first: "Alice", last: "Doe" }, age: 32 },
      { name: { first: "Tom", last: "Dupont" }, age: 60 },
      { name: { first: "Candice", last: "Smith" }, age: 45 },
    ];

    const expected = [
      { name: { first: "Bob" } },
      { name: { first: "Alice" } },
      { name: { first: "Tom" } },
      { name: { first: "Candice" } },
    ];
    const actual = arr.map(pick("name.first", "notfound"));

    expect(actual).toEqual(expected);
  });

  it("ignores key if key not found in an array of objects (nested)", () => {
    const arr = [
      { name: { first: "Bob", last: "Garcia" }, age: 23 },
      { name: { first: "Alice", last: "Doe" }, age: 32 },
      { name: { first: "Tom", last: "Dupont" }, age: 60 },
      { name: { first: "Candice", last: "Smith" }, age: 45 },
    ];

    const expected = [{ age: 23 }, { age: 32 }, { age: 60 }, { age: 45 }];
    const actual = arr.map(pick("name.first.notfound", "age"));

    expect(actual).toEqual(expected);
  });

  it("ignores key if key not found in an array of objects (deeply nested)", () => {
    const arr = [
      {
        name: { first: "Bob", last: "Garcia" },
        age: { value: 23, birthday: { year: 1999, month: 3 } },
      },
      {
        name: { first: "Alice", last: "Doe" },
        age: { value: 32, date: { year: 1990, month: 1 } },
      },
      {
        name: { last: "Dupont" },
        age: { value: 60, date: { year: 1962, month: 10 } },
      },
      {
        name: { first: "Candice", last: "Smith" },
        age: { value: 45, birthday: { month: 8 } },
      },
    ];

    const expected = [
      { name: { first: "Bob" }, age: { birthday: { year: 1999 } } },
      { name: { first: "Alice" } },
      null,
      { name: { first: "Candice" } },
    ];
    const actual = arr.map(pick("name.first", "age.birthday.year"));

    expect(actual).toEqual(expected);
  });
});
