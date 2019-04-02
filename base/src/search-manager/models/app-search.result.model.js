var AppSearchResult = /** @class */ (function () {
    function AppSearchResult() {
    }
    AppSearchResult.prototype.deserialize = function (input) {
        this.entities = input.entities || [];
        this.type = input.type || '';
        this.query = input.query || '';
        return this;
    };
    return AppSearchResult;
}());
export { AppSearchResult };
//# sourceMappingURL=app-search.result.model.js.map