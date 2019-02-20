/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {Promise} from 'es6-promise'

export class AppSearchOperator {
  appIdentifier:string;
  constructor(
    appIdentifier:string
  ){
    this.appIdentifier = appIdentifier;
  }
  public getHttp(queryString:string):Promise<any>{
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
                  resolve(processResultsInstance(result, queryString));
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

  public processResults (input:any, query:string):any[]{
    if (input && typeof(input) === "object" && input.pluginDefinitions){
      return input.pluginDefinitions
      .filter((instance:any)=>{
        return instance &&
        instance.pluginType &&
        instance.pluginType.toLowerCase() === "application" &&
        AppSearchOperator.searchObjectAttributes(instance, query.toLowerCase()) === true
      }).map((instance:any)=>{
        return {
          appIdentifier:instance.identifier,
          summary: instance.webContent.descriptionDefault,
          title: instance.webContent.launchDefinition.pluginShortNameDefault
        }
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
