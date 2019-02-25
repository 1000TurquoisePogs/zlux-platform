/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {Promise} from 'es6-promise';
import {SearchResult} from '../models/search-result.model';
import { WebEntity } from '../models/web-entity.model';

export class WebSearchOperator {
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
    this.queryHref = queryHref;
    this.title = title;
    this.summary = summary;
    this.type = type;
    this.count = count;
    this.query = query;
    this.href = href;
  }

  public addCount():string{
    // TODO need to consider if/how we'd set this dynamically
    return this.count !== null ? "&" + this.count +"=20": "";
  }

  public addQueryStr(queryString:string):string{
    let output:string = "";
    for (const indQuery of this.query){
      output += "&" + indQuery + "=" + encodeURI(queryString);
    }
    return output;
  }

  public constructUrl(queryString:string):string{
    return this.queryHref + this.addQueryStr(queryString) + this.addCount();
  }

  public getHttp(queryString:string, searchCapability:string):Promise<SearchResult>{
    const self:WebSearchOperator = this;
    return new Promise((resolve, reject) => {
  var request = new XMLHttpRequest();
  const processResultsInstance = this.processResults;

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      /* Request complete */
      switch (this.status) {
        case 200:
        case 304:
          try {
            var result = JSON.parse(this.responseText);
            resolve(processResultsInstance(result, queryString, searchCapability, self));
          } catch (error) {
            reject(error);
          }
          break;
        default:
          reject(this.responseText)
          break;
      }
    }
  };
  request.open("GET", this.constructUrl(queryString), true);
  request.send();
});

  }
  public processResults(input:any, query:string, searchCapability:string, instance:WebSearchOperator):SearchResult{
    let result:SearchResult = new SearchResult({query:query, type:searchCapability});
    let entities:WebEntity[] = [];
    let titles:string[] = [];
    let summaries:string[] = [];
    let hrefs:string[] = [];
    const titleJson:string[] = instance.title.split('.');
    const summaryJson:string[] = instance.summary.split('.');
    const hrefJson:string[] = instance.href.split('.');
    if (input[titleJson[0]] &&
      input[titleJson[0]].length > 0 &&
      input[titleJson[0]][0][titleJson[2]] &&
      input[summaryJson[0]] &&
      input[summaryJson[0]].length > 0 &&
      input[summaryJson[0]][0][summaryJson[2]] &&
      input[hrefJson[0]] &&
      input[hrefJson[0]].length > 0 &&
      input[hrefJson[0]][0][hrefJson[2]]
    ){
      for(let i:number= 0; i < input[titleJson[0]].length; i++){
          if (input[titleJson[0]][i][titleJson[2]])
          titles.push(input[titleJson[0]][i][titleJson[2]]);
        }
        for(let i:number= 0; i < input[summaryJson[0]].length; i++){
          if (input[summaryJson[0]][i][summaryJson[2]])
          summaries.push(input[summaryJson[0]][i][summaryJson[2]]);
        }
        for(let i:number= 0; i < input[hrefJson[0]].length; i++){
          if (input[hrefJson[0]][i][hrefJson[2]])
          hrefs.push(input[hrefJson[0]][i][hrefJson[2]]);
        }
        // each result has a title/summary/href, eg equal count
        if (hrefs.length === titles.length && hrefs.length === summaries.length){
          for (let i:number=0; i < hrefs.length; i++){
            entities.push(new WebEntity({title:titles[i], summary:summaries[i], href:hrefs[i]}));
          }
        }
        result.entities = entities
      }
    return result;
  }

  public getResults(queryString:string, searchCapability:string):Promise<SearchResult>{
    return this.getHttp(queryString, searchCapability);
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
