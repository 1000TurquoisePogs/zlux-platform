import { WebSearchOperator } from './web-search-operator';
describe('Test the WebSearchOperator functionality', function () {
    it('null object returns []', function () {
        var whatever = new WebSearchOperator("blah", "topics.#.label", "topics.#.summary", "topics.#.href", null, ["blah", "blah"], "blah");
        expect(whatever.processResults({}, "2")).toEqual([]);
    });
});
//# sourceMappingURL=web-search-operator.test.js.map