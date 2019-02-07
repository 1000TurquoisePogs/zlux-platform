var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import { SearchOperator } from './search-operator';
var AppSearchOperator = /** @class */ (function (_super) {
    __extends(AppSearchOperator, _super);
    function AppSearchOperator(type, title, summary, queryHref, count, appIdentifier) {
        var _this = _super.call(this, type, title, summary, count, queryHref) || this;
        _this.appIdentifier = appIdentifier;
        return _this;
    }
    AppSearchOperator.prototype.getHttp = function (queryString) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == 4) {
                    /* Request complete */
                    switch (this.status) {
                        case 200:
                        case 304:
                            try {
                                var result = JSON.parse(this.responseText);
                                resolve(AppSearchOperator.processResults(result, queryString));
                            }
                            catch (error) {
                                reject(error);
                            }
                            break;
                        default:
                            reject(this.responseText);
                            break;
                    }
                }
            };
            request.open("GET", ZoweZLUX.uriBroker.pluginListUri(undefined), true);
            request.send();
        });
    };
    AppSearchOperator.prototype.getResults = function (queryString) {
        return this.getHttp(queryString);
    };
    AppSearchOperator.processResults = function (input, query) {
        if (input && typeof (input) === "object" && input.pluginDefinitions) {
            return input.pluginDefinitions
                .filter(function (instance) {
                return instance &&
                    instance.pluginType &&
                    instance.pluginType.toLowerCase() === "application" &&
                    AppSearchOperator.searchObjectAttributes(instance, query.toLowerCase()) === true;
            });
        }
        return [];
    };
    AppSearchOperator.searchObjectAttributes = function (obj, search) {
        var status = false;
        for (var attr in obj) {
            if (typeof (obj[attr]) !== "undefined" && obj[attr] !== null) {
                if (typeof (obj[attr]) === "object") {
                    status = AppSearchOperator.searchObjectAttributes(obj[attr], search);
                }
                else if (typeof (obj[attr]) === "string") {
                    status = obj[attr].toLowerCase().indexOf(search) !== -1;
                }
                else if (typeof (obj[attr]) === "number") {
                    status = obj[attr].toString().indexOf(search) !== -1;
                }
            }
            if (status) {
                break;
            }
        }
        return status;
    };
    return AppSearchOperator;
}(SearchOperator));
export { AppSearchOperator };
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
//# sourceMappingURL=app-search-operator.js.map