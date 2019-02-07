/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {SearchOperator} from './search-operator'
export class AppSearchOperator extends SearchOperator {
  private appIdentifier:string;
  constructor(
    type:string,
    title:string,
    summary:string,
    queryHref:string,
    count:number|null,
    appIdentifier:string
  ){
    super(
      type,
      title,
      summary,
      count,
      queryHref
    );
    this.appIdentifier = appIdentifier;
  }
  public getHttp(queryString:string):Promise<any>{
      return new Promise((resolve, reject) => {
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
        request.open("GET", ZoweZLUX.uriBroker.pluginListUri(undefined), true);
        request.send();
      });
  }

  public getResults(queryString:string):Promise<any[]>{
    return this.getHttp(queryString);
  }

  private static searchObjectAttributes = (obj:any, search:string):boolean =>{
    let status:boolean = false;
      for (const attr in obj){
        if ( typeof(obj[attr]) !== "undefined" && obj[attr] !== null ) {
          if (typeof(obj[attr]) === "object"){
            status = AppSearchOperator.searchObjectAttributes(obj[attr], search);
          }
          else if (typeof(obj[attr]) === "string") {
            status = obj[attr].toLowerCase().indexOf(search) !== -1
          }
          else if (typeof(obj[attr]) === "number") {
            status = obj[attr].toString().indexOf(search) !== -1
          }
        }
        if (status)
        {
          break;
        }
      }
      return status;
  };

  public static processResults (input:any, query:string){
    if (input && typeof(input) === "object" && input.pluginDefinitions){
      return input.pluginDefinitions
      .filter((instance:any)=>{
        return instance &&
        instance.pluginType &&
        instance.pluginType.toLowerCase() === "application" &&
        AppSearchOperator.searchObjectAttributes(instance, query.toLowerCase()) === true
      })
    }
    return [];
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
