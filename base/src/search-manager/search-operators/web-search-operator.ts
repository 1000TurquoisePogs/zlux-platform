/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {SearchOperator} from './search-operator'
export class WebSearchOperator {//extends SearchOperator {
  href:string;
  query:string[];

  queryHref:string;
  title:string;
  summary:string;
  type:string;
  count:number|null
  constructor(
    type:string,
    title:string,
    summary:string,
    href:string,
    count:number|null,
    query:string[],
    queryHref:string
  ){
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
  public processResults(input:any, query:string):any[]{
    let result:any[] = [];
    let titles:string[] = [];
    let summaries:string[] = [];
    let hrefs:string[] = [];
    const titleJson:string[] = this.title.split('.');
    const summaryJson:string[] = this.summary.split('.');
    const hrefJson:string[] = this.href.split('.');
    if (input[titleJson[0]] &&
      input[summaryJson[0]] &&
      input[hrefJson[0]]){
        for(let i:number= 0; i < input[titleJson[0]]; i++){
          titles.push(input[titleJson[0]][i][titleJson[2]]);
        }
        for(let i:number= 0; i < input[summaryJson[0]]; i++){
          summaries.push(input[summaryJson[0]][i][summaryJson[2]]);
        }
        for(let i:number= 0; i < input[hrefJson[0]]; i++){
          hrefs.push(input[hrefJson[0]][i][hrefJson[2]]);
        }
        // assuming each result has a title/summary/href, eg equal count
        for (let i:number=0; i < hrefs.length; i++){
          result.push({title:titles[i], summary:summaries[i], href:hrefs[i]});
        }
      }
    return result;
  }

  // public getResults(queryString:string):Promise<any[]>{
  //   return this.getHttp(queryString);
  // }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
