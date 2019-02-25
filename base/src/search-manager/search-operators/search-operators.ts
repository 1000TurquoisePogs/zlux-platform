/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {config}  from '../config/types';
import {WebSearchOperator} from './web-search-operator';
import {AppSearchOperator} from './app-search-operator';
import {FileSearchOperator} from './file-search-operator';
import {FolderSearchOperator} from './folder-search-operator';
import {SearchResult} from '../models/search-result.model';


export class SearchOperators {
  private websearchOperators:WebSearchOperator[];
  private appsearchOperators:AppSearchOperator[];
  // private appFileFolderOperators=>search app's file/folders (contextually)
  //TODO wrap file/folder into one
  //TODO offload capabilities to json
  private filesearchOperator:FileSearchOperator;
  private foldersearchOperator:FolderSearchOperator
  constructor(){
    this.websearchOperators = new Array<WebSearchOperator>();
    this.appsearchOperators = new Array<AppSearchOperator>();
    this.filesearchOperator = new FileSearchOperator();
    this.foldersearchOperator = new FolderSearchOperator();

    // TODO consider creating a type for config when more solid
    const configJson:any = config;
    for (let i:number = 0; i < configJson.searchNodes.length; i++){
      if (configJson.searchNodes[i].format.toLowerCase() === "web"){
        this.websearchOperators.push(new WebSearchOperator(
          configJson.searchNodes[i].type,
          configJson.searchNodes[i].title,
          configJson.searchNodes[i].summary,
          configJson.searchNodes[i].href,
          configJson.searchNodes[i].count,
          configJson.searchNodes[i].query,
          configJson.searchNodes[i].queryHref));
      }
      else if (configJson.searchNodes[i].format.toLowerCase() === "app"){
        this.appsearchOperators.push(new AppSearchOperator(
          configJson.searchNodes[i].appIdentifier
        ));
      }
    }
  }
  public decodeQueryStringPath(inputStr:string):string{
    const parts:string[] = inputStr.split("&");
    for (const part of parts){
      if (part.toLowerCase().indexOf("path=")){
        return part.substring(5);
      }
    }
    return "";
  }

  public decodeQueryStringSearch(inputStr:string):string{
    const parts:string[] = inputStr.split("&");
    for (const part of parts){
      if (part.toLowerCase().indexOf("search=")){
        return decodeURI(part.substring(7));
      }
    }
    return "";
  }

  public executeSearch(queryString:string, searchCapabilities:string[]):Promise<SearchResult[]>{
    let promises_array:Array<any> = [];
    for (const searchCapability of searchCapabilities){
      let breakSet:boolean = false;
      for (let i:number = 0; i < this.websearchOperators.length; i++){
          if (searchCapability.toLowerCase() === this.websearchOperators[i].type.toLowerCase()){
            promises_array.push(this.websearchOperators[i].getResults(
              this.decodeQueryStringSearch(queryString), 
              searchCapability));
            breakSet=true;
            break;
        }
      }
      if (!breakSet && searchCapability.toLowerCase() === "app"){
        for (let i:number = 0; i < this.appsearchOperators.length; i++){
          promises_array.push(this.appsearchOperators[i].getResults(
            this.decodeQueryStringSearch(queryString),
            "app"));
          breakSet=true;
          break;
        }
      }
      if (!breakSet && searchCapability.toLowerCase() === "file" ){
        promises_array.push(this.filesearchOperator.getResults(
          this.decodeQueryStringSearch(queryString),
          this.decodeQueryStringPath(queryString), "file"));
        breakSet=true;
      }
      if (!breakSet && searchCapability.toLowerCase() === "folder"){
        promises_array.push(this.foldersearchOperator.getResults(
          this.decodeQueryStringSearch(queryString),
          this.decodeQueryStringPath(queryString), "folder"));
      }
    }
    return Promise.all(promises_array);
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
