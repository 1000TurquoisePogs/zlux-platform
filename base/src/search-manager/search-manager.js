import { SearchOperators } from './search-operators/search-operators';
var SearchManager = /** @class */ (function () {
    function SearchManager() {
        var _this = this;
        this.conductSearches = function (queryString) {
            _this.searchOperators.executeSearch(queryString).then(function (result) {
                _this.searchResults = result;
            }, function (error) {
                // TODO: need to figure out how to handle error case
            });
        };
        this.searchResults = new Array();
        // this.handlers = new Array<MVDHosting.NotificationWatcher>();
        this.searchOperators = new SearchOperators();
    }
    // private handlers: MVDHosting.NotificationWatcher[];
    SearchManager.prototype.configSearchOptions = function () {
    };
    SearchManager.prototype.getAllByCategory = function (type) {
        var filtered = [];
        for (var i = 0; i < this.searchResults.length; i++) {
            if (this.searchResults[i].getType() === type) {
                filtered.push(this.searchResults[i]);
            }
        }
        /* NgFor is going from first element. We need to start from the end to show the most recent notifications first.
        It would make more sense to just pop all elements from notification cache, but if we closed the app, they'd all be gone.
        */
        return filtered.reverse();
    };
    SearchManager.prototype.clear = function () {
        this.searchResults.length = 0;
    };
    SearchManager.prototype.getCount = function () {
        return this.searchResults.length;
    };
    return SearchManager;
}());
export { SearchManager };
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
//# sourceMappingURL=search-manager.js.map