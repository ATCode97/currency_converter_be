const { expect } = require("chai");
const { formatDates } = require("../db/utils/utils");

describe("formatDates", () => {
  it("will return a empty array when passed through a empty array", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("will format the date of an object array that contains one value", () => {
    const input = [
      {
        GBP: 100,
        foreign_currency: "USD",
        amount: 131.41,
        exchanged_at: 1542284514171,
      },
    ];
    const actual = formatDates(input);

    expect(actual[0].exchanged_at instanceof Date).to.equal(true);
  });
  it("will format the date of an object array that contains more than one value", () => {
    const input = [
      {
        GBP: 100,
        foreign_currency: "USD",
        amount: 131.41,
        exchanged_at: 1542284514171,
      },
      {
        GBP: 100,
        foreign_currency: "AUD",
        amount: 183.47,
        exchanged_at: 1542284514171,
      },
    ];
    const actual = formatDates(input);

    expect(actual[0].exchanged_at instanceof Date).to.equal(true);
    expect(actual[1].exchanged_at instanceof Date).to.equal(true);
  });
  it("MUTATION -won't mutate the original array", () => {
    const input = [
      {
        GBP: 100,
        foreign_currency: "USD",
        amount: 131.41,
        exchanged_at: 1542284514171,
      },
    ];
    formatDates(input);

    expect(input).to.eql([
      {
        GBP: 100,
        foreign_currency: "USD",
        amount: 131.41,
        exchanged_at: 1542284514171,
      },
    ]);
  });
});
