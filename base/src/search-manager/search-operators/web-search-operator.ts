/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

const REQUEST_TYPE_QUERY = 0;
//const REQUEST_TYPE_POST = 1;

export class WebSearchHandler {//extends MVDHosting.SearchHandler {
  constructor(protected context: any){
//    super(context);    
  }

  private addLimit(limit?: number):string{
    return this.context.definition.limitParm !== undefined && limit !== undefined
      ?  `&${this.context.definition.limitParm}=${limit}`
      : "";
  }

  private constructUrl(queryString:string, limit?: number):string{
    if (this.context.definition.requestType === REQUEST_TYPE_QUERY) {
      const pos = this.context.definition.queryHref.indexOf(`${this.context.definition.queryParm}=%q`);
      if (pos == -1) {
        throw new Error(`Cannot find query substitution spot`);
      }
      const offset = pos+this.context.definition.queryParm.length+1;
      return this.context.definition.queryHref.substring(0,offset) + queryString
        + this.context.definition.queryHref.substring(offset+2) + this.addLimit(limit);
    } else { return this.context.definition.queryHref; }
  }

  private getHttp(queryString:string, limit?: number):Promise<MVDHosting.SearchResult>{
    const self:WebSearchHandler = this;
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
                resolve(processResultsInstance(result, self));
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
      if (this.context.definition.requestType === REQUEST_TYPE_QUERY) {
        request.open("GET", this.constructUrl(queryString, limit), true);
        request.send();
      } else {
        console.warn(`TODO: REQUEST_TYPE_POST and others`);
      }
    });
  }
  
  protected stripFormatting(input:string):string{
    return input.replace(/<b>/g,'').replace(/<\/b>/g,'');
  }
  
  private processResults(input:any, instance:WebSearchHandler):MVDHosting.SearchResult{

    let entries:MVDHosting.SearchData[] = [];
    let result:MVDHosting.SearchResult = {type: instance.getType(),
                                          id: instance.getId(),
                                          shortName: instance.getShortName(),
                                          longName: instance.getLongName(),
                                          entries: entries};
    
    let titles:string[] = [];
    let summaries:string[] = [];
    let hrefs:string[] = [];
    const titleJson:string[] = instance.context.definition.title.split('.');
    const summaryJson:string[] = instance.context.definition.summary.split('.');
    const hrefJson:string[] = instance.context.definition.resultHref.split('.');
    const hrefPrefix = instance.context.definition.resultHrefPrefix ? instance.context.definition.resultHrefPrefix : '';
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
          if (input[titleJson[0]][i][titleJson[2]]){
            titles.push(input[titleJson[0]][i][titleJson[2]]);
          }
        }
        for(let i:number= 0; i < input[summaryJson[0]].length; i++){
          if (input[summaryJson[0]][i][summaryJson[2]]){
            const sum:string = instance.stripFormatting(input[summaryJson[0]][i][summaryJson[2]])
            summaries.push(sum);
          }
        }
        for(let i:number= 0; i < input[hrefJson[0]].length; i++){
          if (input[hrefJson[0]][i][hrefJson[2]])
          {
            hrefs.push(hrefPrefix+input[hrefJson[0]][i][hrefJson[2]]);
          }
        }
        // each result has a title/summary/href, eg equal count
        if (hrefs.length === titles.length && hrefs.length === summaries.length){
          for (let i:number=0; i < hrefs.length; i++){
            entries.push({title:titles[i], summary:summaries[i], data:{href:hrefs[i]}});
          }
        }
        result.entries = entries;
      }
    return result;
  }

  public search(queryString:string, limit?: number):Promise<MVDHosting.SearchResult>{
    return this.getHttp(queryString, limit);
  }

  getType(): string { return this.context.definition.type };
  getId(): string { return this.context.id };
  getShortName(): string { return this.context.definition.name };
  getLongName(): string { return this.context.definition.description };
  getTopics(): string[] { return this.context.definition.topics };

}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
