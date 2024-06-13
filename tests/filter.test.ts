import { filter } from '../src';

// --------------------- AND LOGIC---------------------
describe("(filter) [AND logic] Generic filter values against values - All checks must be TRUE", () => {
  test("[AND] match 2 identical ARRAYS", () =>
    expect(
      filter(
        [
          "must",
          "be",
          "the",
          "same"
        ],
        [
          "must",
          "be",
          "the",
          "same"
        ]
      )
    ).toBeTruthy()
  );

  test("[AND] match 2 ARRAYS (true) - first (toCheck) must have all parameters of the second (toMatch)", () =>
    expect(
      filter(
        [
          "must",
          "be",
          "the",
          "same"
        ],
        [
          "must",
          "be",
          "the",
          "same",
          "error"
        ]
      )
    ).toBeTruthy()
  );

  test("[AND] match 2 ARRAYS (false) - same as above, but inverted {toCheck} and {toMatch}", () =>
    expect(
      filter(
        [
          "must",
          "be",
          "the",
          "same",
          "error"
        ],
        [
          "must",
          "be",
          "the",
          "same"
        ]
      )
    ).toBeFalsy()
  );

  test("[AND] match STRING with ARRAY - the string will be checked with all the array values, they must all be the same", () =>
    expect(
      filter("same", ["same", "same", "same"])
    ).toBeTruthy()
  );

  test("[AND] match STRING with ARRAY - same as above", () =>
    expect(
      filter("same", ["same", "not-same"]) ||
      filter(["same", "not-same"], "same")
    ).toBeFalsy()
  );
});


// --------------------- OR LOGIC---------------------

describe("(filter) [OR logic] Generic filter values against values - Just ONE check must be TRUE", () => {
  test("[OR] match 2 identical ARRAYS", () =>
    expect(
      filter(
        [
          "lorem",
          "ipsum",
          "sit dolor"
        ],
        [
          "lorem",
          "ipsum",
          "sit dolor"
        ],
        "or"
      )
    ).toBeTruthy()
  );

  test("[OR] match 2 ARRAYS - one must have at least 1 parameter of the other", () =>
    expect(
      filter(
        [
          "lorem",
          "test",
          "sit dolor"
        ],
        [
          "test",
          "toast"
        ],
        "or"
      ) &&
      filter(
        [
          "test",
          "toast"
        ],
        [
          "lorem",
          "test",
          "sit dolor"
        ],
        "or"
      )
    ).toBeTruthy()
  );

  test("[OR] match STRING with ARRAY - the string will be checked with all the array values, at least 1 must be the same", () =>
    expect(
      filter("ipsum", ["lorem", "ipsum", "sit dolor"], "or") &&
      filter(["lorem", "ipsum", "sit dolor"], "ipsum", "or")
    ).toBeTruthy()
  );
});


// --------------------- INDIFFERENT LOGIC---------------------

describe("(filter) [INDIFFERENT logic] Simple values the same as the {function match} tests", () => {
  test("Match STRING with STRING 1", () =>
    expect(
      filter('lorem ipsum', 'Lorem Ispum', undefined, {
        distance: 2
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 2", () =>
    expect(
      filter('lorem ipsum', 'Lorem Ispum', undefined, {
        distance: 2
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 3", () =>
    expect(
      filter('lorem ipsum', 'Lorem Ispum', undefined, {
        sensitive: true,
        distance: 4
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 4", () =>
    expect(
      filter('lorem ipsum', 'Lorem Ispum', undefined, {
        sensitive: true,
        distance: 4
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 5", () =>
    expect(
      filter('lorem ipsum', 'Lorem Ipsum', undefined)
    ).toBeTruthy()
  );

  test("Match STRING with STRING 6", () =>
    expect(
      filter('lorem ipsum', 'Lorem Ipsum', undefined, {
        sensitive: true
      })
    ).toBeFalsy()
  );

  test("Match STRING with STRING 7", () =>
    expect(
      filter('lorem', 'Lorem Ipsum', undefined, {
        distance: -1
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 8", () =>
    expect(
      filter('Lorem', 'Lorem Ipsum', undefined, {
        sensitive: true,
        distance: -1
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 9", () =>
    expect(
      filter('Lorem Ipsum', 'lorem', undefined, {
        distance: -2
      }) &&
      filter('lorem', 'Lorem Ipsum', undefined, {
        distance: -2
      })
    ).toBeTruthy()
  );

  test("Match STRING with STRING 10", () =>
    expect(
      filter('Lorem Ipsum', 'Lorem', undefined, {
        sensitive: true,
        distance: -2
      }) &&
      filter('Lorem', 'Lorem Ipsum', undefined, {
        sensitive: true,
        distance: -2
      })
    ).toBeTruthy()
  );

  test("Match BOOLEAN with BOOLEAN 1", () =>
    expect(
      !filter(true, false)
    ).toBeTruthy()
  );

  test("Match BOOLEAN with BOOLEAN 2", () =>
    expect(
      !filter(false, true)
    ).toBeTruthy()
  );

  test("Match BOOLEAN with BOOLEAN 3", () =>
    expect(
      filter(true, true)
    ).toBeTruthy()
  );

  test("Match BOOLEAN with BOOLEAN 4", () =>
    expect(
      filter(false, false)
    ).toBeTruthy()
  );

  test("Match NUMBER with NUMBER 1", () =>
    expect(
      !filter(1, 2)
    ).toBeTruthy()
  );

  test("Match NUMBER with NUMBER 2", () =>
    expect(
      !filter(2, 1)
    ).toBeTruthy()
  );

  test("Match NUMBER with NUMBER 3", () =>
    expect(
      filter(3, 3)
    ).toBeTruthy()
  );
});
