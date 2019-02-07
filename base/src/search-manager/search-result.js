/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
var SearchResult = /** @class */ (function () {
    function SearchResult(title, summary, appIdentifier, href, type) {
        if (title !== null && summary !== null &&
            (appIdentifier != null || href !== null)) {
            this.title = title;
            this.summary = summary;
            this.appIdentifier = appIdentifier || null;
            this.href = href || null;
            this.type = type;
        }
        else {
            throw new Error("SearchResult types are not a valid!");
        }
    }
    SearchResult.prototype.getType = function () {
        return this.type;
    };
    return SearchResult;
}());
export { SearchResult };
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
//# sourceMappingURL=search-result.js.map