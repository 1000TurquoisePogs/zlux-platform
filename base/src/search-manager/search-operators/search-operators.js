/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import config from '../config/types.json';
import { WebSearchOperator } from './web-search-operator';
import { AppSearchOperator } from './app-search-operator';
var SearchOperators = /** @class */ (function () {
    //private appFileFolderOperators=>search app's file/folders (contextually)
    function SearchOperators() {
        this.websearchOperators = new Array();
        this.appsearchOperators = new Array();
        // TODO consider creating a type for config when more solid
        var configJson = JSON.parse(config);
        for (var i = 0; i < configJson.length; i++) {
            if (configJson[i].format.toLowerCase() === "web") {
                this.websearchOperators.push(new WebSearchOperator(configJson[i].type, configJson[i].title, configJson[i].summary, configJson[i].href, configJson[i].count, configJson[i].query, configJson[i].queryHref));
            }
            else if (configJson[i].format.toLowerCase() === "app") {
                this.appsearchOperators.push(new AppSearchOperator(configJson[i].type, configJson[i].title, configJson[i].summary, configJson[i].queryHref, configJson[i].count, configJson[i].appIdentifier));
            }
        }
    }
    // TODO figure out interface to convey what sort of search is being conducted:
    //app/web/file/folder
    // public executeSearch(queryString:string, context:SearchType){
    SearchOperators.prototype.executeSearch = function (queryString) {
        var promises_array = [];
        for (var i = 0; i < this.websearchOperators.length; i++) {
            promises_array.push(this.websearchOperators[i].getResults(queryString));
        }
        for (var i = 0; i < this.appsearchOperators.length; i++) {
            promises_array.push(this.appsearchOperators[i].getResults(queryString));
        }
        return Promise.all(promises_array);
        // TODO need a convention to arbitrate what results the
        // queryString is being harnessed
    };
    return SearchOperators;
}());
export { SearchOperators };
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
//# sourceMappingURL=search-operators.js.map