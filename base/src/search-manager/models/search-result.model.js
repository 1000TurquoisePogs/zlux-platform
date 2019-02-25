import { WebEntity } from './web-entity.model';
var SearchResult = /** @class */ (function () {
    function SearchResult(obj) {
        this.entities = (obj && obj.entities) || [];
        this.entities = (obj && obj.entities) || [];
        this.query = (obj && obj.query) || '';
        this.type = (obj && obj.type) || '';
    }
    SearchResult.prototype.deserialize = function (input, query, type) {
        this.query = query;
        this.files = input.files;
        this.type = type;
        this.entities = input.map(function (instance) { return new WebEntity().deserialize(instance); });
        return this;
    };
    return SearchResult;
}());
export { SearchResult };
//# sourceMappingURL=search-result.model.js.map