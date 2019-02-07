import {WebSearchOperator} from './web-search-operator'
describe('Test the WebSearchOperator functionality', () => {

  it('null object returns []', () => {
    const whatever = new WebSearchOperator(
      "blah",
      "topics.#.label",
      "topics.#.summary",
      "topics.#.href",
      null,
      ["blah","blah"],
      "blah",
    );
    expect(whatever.processResults({}, "2")).toEqual([]);
  });

  it('null object returns []', () => {
    const whatever = new WebSearchOperator(
      "blah",
      "topics.#.label",
      "topics.#.summary",
      "topics.#.href",
      null,
      ["blah","blah"],
      "blah",
    );
    expect(whatever.processResults({}, "2")).toEqual([]);
  });

});
