/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {Promise} from 'es6-promise'
import {FileSearchOperator} from './file-search-operator'
export class FolderSearchOperator {
  fileSearchOperator:FileSearchOperator;
  constructor(
  ){
     this.fileSearchOperator = new FileSearchOperator();
  }
  public getHttpFolder(queryString:string, path:string, searchCapability:string):Promise<any>{
    const self:any = this;
      return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        const processFolderResults = this.processFolderResults;
        request.onreadystatechange = function () {
          if (this.readyState == 4) {
            /* Request complete */
            switch (this.status) {
              case 200:
              case 304:
                try {
                  var result = JSON.parse(this.responseText);
                  resolve(processFolderResults(result, queryString, searchCapability, self));
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
        request.open("GET", ZoweZLUX.uriBroker.unixFileUri('contents', path));
        request.send();
      });
  }

  public getResults(queryString:string, path:string, searchCapability:string):Promise<any[]>{
    return this.getHttpFolder(queryString, path, searchCapability);
  }

  public processResFiles(results:any[]):any{
    let endResult: any = {files:[], query:'', type:''};
    for(const result of results){
      if (!!result.query){
        endResult.query = result.query;
        endResult.type = result.type;
      }
      if (result.files[0].lines.length > 0){
        endResult.files.push(result.files[0]);
      }
    }
    return endResult;
  }

  public processFolderResults (input:any, query:string, searchCapability:string, self:any):Promise<any[]>{
    let promises_array:Array<any> = [];
    for (const entry of input.entries){
      if (!entry.directory){
        promises_array.push(self.fileSearchOperator.getResults(query, entry.path, searchCapability))
      }
      // TODO: are we to search directory names for the query, too?
    }
    return Promise.all(promises_array)
    .then((results:any[])=>{
      return self.processResFiles(results);
    })
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
