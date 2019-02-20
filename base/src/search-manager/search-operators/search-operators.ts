/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
// import config from '../config/types.json';
import {WebSearchOperator} from './web-search-operator';
import {AppSearchOperator} from './app-search-operator';

export class SearchOperators {
  private websearchOperators:WebSearchOperator[];
  private appsearchOperators:AppSearchOperator[];
  //private appFileFolderOperators=>search app's file/folders (contextually)
  constructor(){
    this.websearchOperators = new Array<WebSearchOperator>();
    this.appsearchOperators = new Array<AppSearchOperator>();
    // TODO consider creating a type for config when more solid
    // const configJson:any = JSON.parse(config);
    // for (let i:number = 0; i < configJson.length; i++){
    //   if (configJson[i].format.toLowerCase() === "web"){
    //     this.websearchOperators.push(new WebSearchOperator(
    //       configJson[i].type,
    //       configJson[i].title,
    //       configJson[i].summary,
    //       configJson[i].href,
    //       configJson[i].count,
    //       configJson[i].query,
    //       configJson[i].queryHref));
    //   }
    //   else if (configJson[i].format.toLowerCase() === "app"){
    //     this.appsearchOperators.push(new AppSearchOperator(
    //       configJson[i].type,
    //       configJson[i].title,
    //       configJson[i].summary,
    //       configJson[i].queryHref,
    //       configJson[i].count,
    //       configJson[i].appIdentifier
    //     ));
    //   }
    // }
  }

  // TODO figure out interface to convey what sort of search is being conducted:
  //app/web/file/folder
  // public executeSearch(queryString:string, context:SearchType){

  public executeSearch(queryString:string):Promise<any>{
    let promises_array:Array<any> = [];
    for (let i:number = 0; i < this.websearchOperators.length; i++){
       promises_array.push(this.websearchOperators[i].getResults(queryString));
    }
    for (let i:number = 0; i < this.appsearchOperators.length; i++){
      promises_array.push(this.appsearchOperators[i].getResults(queryString));
    }
    return Promise.all(promises_array);
    // TODO need a convention to arbitrate what results the
    // queryString is being harnessed
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
