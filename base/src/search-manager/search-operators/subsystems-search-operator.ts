/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import {SubsystemEntity} from '../models/subsystem-entity.model'
import {SearchResult} from '../models/search-result.model'
import {Subsystems} from '../models/subsystems-search.result.model'
export class SubsystemsSearchOperator {
  constructor(){}
  public getHttp(queryString:string, searchCapability:string):Promise<any>{
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
                  resolve(processResultsInstance(result, queryString, searchCapability));
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
        request.open("GET", "/ZLUX/plugins/org.zowe.zossystem.subsystems/services/data/_current/zosDiscovery/naive/subsystems", true);
        request.send();
      });
  }

  public getResults(queryString:string, searchCapability:string):Promise<any[]>{
    return this.getHttp(queryString, searchCapability);
  }

  private static searchAttributes = (entities:SubsystemEntity[], search:string):SubsystemEntity[] =>{
    return entities.filter((instance:SubsystemEntity)=>{
      return instance.name.toLowerCase().indexOf(search) !== -1 ||
      instance.t.toLowerCase().indexOf(search) !== -1 ||
      instance.subsystemType.toLowerCase().indexOf(search) !== -1
    })
  };

  public processResults (input:any, query:string, searchCapability:string):any{
    let searchResults:SearchResult = new SearchResult({query:query, type:searchCapability});

    let result: Subsystems = new Subsystems();
    if (input && input.SUBSYSTEMS){
      if (input.SUBSYSTEMS.CICS){
        result.cics = SubsystemsSearchOperator.searchAttributes(input.SUBSYSTEMS.CICS, query);
      }
      if (input.SUBSYSTEMS.DB2){
        result.db2 = SubsystemsSearchOperator.searchAttributes(input.SUBSYSTEMS.DB2, query);
      }
      if (input.SUBSYSTEMS.IMS){
        result.ims = SubsystemsSearchOperator.searchAttributes(input.SUBSYSTEMS.IMS, query);
      }
      if (input.SUBSYSTEMS.MQ){
        result.mq = SubsystemsSearchOperator.searchAttributes(input.SUBSYSTEMS.MQ, query);
      }
    }
    searchResults.subsystems = result;
    return searchResults;
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
