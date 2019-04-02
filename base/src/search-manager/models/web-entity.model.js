var WebEntity = /** @class */ (function () {
    function WebEntity(obj) {
        this.title = (obj && obj.title) || '';
        this.summary = (obj && obj.summary) || '';
        this.href = (obj && obj.href) || '';
    }
    WebEntity.prototype.deserialize = function (input) {
        this.title = input.title || '';
        this.summary = input.summary || '';
        this.href = input.href || '';
        return this;
    };
    return WebEntity;
}());
export { WebEntity };
//# sourceMappingURL=web-entity.model.js.map