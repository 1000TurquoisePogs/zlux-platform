var WebSearchOperator = /** @class */ (function () {
    function WebSearchOperator(type, title, summary, href, count, query, queryHref) {
        // super(
        //   type,
        //   title,
        //   summary,
        //   count,
        //   queryHref
        // );
        this.queryHref = queryHref;
        this.title = title;
        this.summary = summary;
        this.type = type;
        this.count = count;
        this.query = query;
        this.href = href;
    }
    //   public addCount():string{
    //     // TODO need to consider if/how we'd set this dynamically
    //     return this.count !== null ? "&" + this.count +"=20": "";
    //   }
    //
    //   public addQueryStr(queryString:string):string{
    //     let output:string = "";
    //     for (const indQuery in this.query){
    //       output += "&" + indQuery + "=" + encodeURI(queryString);
    //     }
    //     return output;
    //   }
    //
    //   public constructUrl(queryString:string):string{
    //     return this.queryHref + this.addQuery(queryString) + this.addCount();
    //   }
    //
    //   public getHttp(queryString:string):Promise<any>{
    //     return new Promise((resolve, reject) => {
    //   var request = new XMLHttpRequest();
    //   request.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //       /* Request complete */
    //       switch (this.status) {
    //         case 200:
    //         case 304:
    //           try {
    //             var result = JSON.parse(this.responseText);
    //             resolve(WebSearchOperator.processResults(result, queryString));
    //
    //             // resolve(WebSearchOperator.processResults(result, queryString));
    //           } catch (error) {
    //             reject(error);
    //           }
    //           break;
    //         default:
    //           reject(this.responseText)
    //           break;
    //       }
    //     }
    //   };
    //   request.open("GET", this.constructUrl(queryString), true);
    //   request.send();
    // });
    //     // encodeURI
    //   }
    WebSearchOperator.prototype.processResults = function (input, query) {
        var result = [];
        var titles = [];
        var summaries = [];
        var hrefs = [];
        var titleJson = this.title.split('.');
        var summaryJson = this.summary.split('.');
        var hrefJson = this.href.split('.');
        if (input[titleJson[0]] &&
            input[summaryJson[0]] &&
            input[hrefJson[0]]) {
            for (var i = 0; i < input[titleJson[0]]; i++) {
                titles.push(input[titleJson[0]][i][titleJson[2]]);
            }
            for (var i = 0; i < input[summaryJson[0]]; i++) {
                summaries.push(input[summaryJson[0]][i][summaryJson[2]]);
            }
            for (var i = 0; i < input[hrefJson[0]]; i++) {
                hrefs.push(input[hrefJson[0]][i][hrefJson[2]]);
            }
            // assuming each result has a title/summary/href, eg equal count
            for (var i = 0; i < hrefs.length; i++) {
                result.push({ title: titles[i], summary: summaries[i], href: hrefs[i] });
            }
        }
        return result;
    };
    return WebSearchOperator;
}());
export { WebSearchOperator };
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
//# sourceMappingURL=web-search-operator.js.map