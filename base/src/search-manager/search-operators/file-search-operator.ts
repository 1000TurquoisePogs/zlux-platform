/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {Promise} from 'es6-promise'
import {Line} from '../models/line.model'
import {File} from '../models/file.model'

export class FileSearchOperator {
  constructor(){}
  public getHttp(queryString:string, path:string, searchCapability:string):Promise<any>{
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
                  resolve(processResultsInstance(this.responseText, queryString, path, searchCapability));
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
    return this.getHttp(queryString, path, searchCapability);
  }

  public processResults (input:any, query:string, path:string, searchCapability:string):any{
    let result: any = {files:[], query:query, type:searchCapability};
    let lines:Line[] = [];
    const rawLines:string[] = input.split(/\r?\n/)
    for(const iter in rawLines){
      if( rawLines[iter].toLowerCase().indexOf(query) !== -1){
        let currLine = new Line()
        currLine.deserialize({line:rawLines[iter], lineNum:iter})
        lines.push(currLine)
      }
    }
    let file:File = new File();
    file.deserialize({lines, name:path});
    result.files.push(file);
    return result;
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
