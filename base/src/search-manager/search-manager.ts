
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {SearchResult} from './search-result.model';
import {SearchOperators} from './search-operators/search-operators';

export class SearchManager implements MVDHosting.SearchManagerInterface {
  private searchOperators:SearchOperators;
  private handlers: MVDHosting.SearchWatcher[];

  constructor() {
    this.handlers = new Array<MVDHosting.SearchWatcher>();
    this.searchOperators = new SearchOperators();
  }

  conductSearches = (queryString:string):Promise<SearchResult[]> =>{
    return this.searchOperators.executeSearch(queryString);
  }

  getHandlerCount(): number {
    return this.handlers.length;
  }

  addSearchHandler(object: MVDHosting.SearchWatcher) {
    this.handlers.push(object);
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
