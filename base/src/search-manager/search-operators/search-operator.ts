
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

export abstract class SearchOperator {
  title:string;
  summary:string;
  type:string;
  count:number|null
  abstract getResults(queryString:string):Promise<any[]>;

  constructor(type:string,title:string,
              summary:string,
              count:number|null,
              ){
                this.title = title;
                this.summary = summary;
                this.type = type;
                this.count = count;
              }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
