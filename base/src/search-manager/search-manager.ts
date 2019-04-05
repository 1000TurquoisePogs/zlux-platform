/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
import {config}  from './config/types';
import {WebSearchHandler} from './search-operators/web-search-operator';

export class SearchManager implements ZLUX.SearchManager {

  private handlers: Set<MVDHosting.SearchHandler> = new Set<MVDHosting.SearchHandler>();
  private handlersByType = new Map<string, MVDHosting.SearchHandler[]>();
  private handlersByTopic = new Map<string, MVDHosting.SearchHandler[]>();
  private handlersById = new Map<string, MVDHosting.SearchHandler>();
  // TODO consider creating a type for config when more solid
  
  constructor() {
    const configJson:any = config;
    for (let i:number = 0; i < configJson.searchNodes.length; i++){
      //TODO put this elsewhere
      const handler = new WebSearchHandler(
        configJson.searchNodes[i].id,
        configJson.searchNodes[i].shortName,
        configJson.searchNodes[i].longName,
        configJson.searchNodes[i].topics,
        configJson.searchNodes[i].title,
        configJson.searchNodes[i].summary,
        configJson.searchNodes[i].queryParm,
        configJson.searchNodes[i].queryHref,
        configJson.searchNodes[i].resultHref,
        configJson.searchNodes[i].requestType,
        configJson.searchNodes[i].resultHrefPrefix,
        configJson.searchNodes[i].limitParm);
      this.handlers.add(handler);
      let type = this.handlersByType.get('web');
      if (!type) {
        type = new Array<MVDHosting.SearchHandler>();
        this.handlersByType.set('web',type);
      }
      type.push(handler);

      let topics = handler.getTopics();
      topics.forEach((topic)=> {
        let topicHandlers = this.handlersByTopic.get(topic);
        if (!topicHandlers) {
          topicHandlers = new Array<MVDHosting.SearchHandler>();
          this.handlersByTopic.set(topic,topicHandlers);
        }
        topicHandlers.push(handler);
      });

      this.handlersById.set(handler.getId(),handler);

    }
  }

  search(queryString:string,
         searchTopics:string[],
         handlerIds:string[],
         limit?: number):Promise<MVDHosting.SearchResult[]>{
    
    let promises_array:Array<any> = [];
    let handlers: Set<MVDHosting.SearchHandler>;
    if (searchTopics.length == 0 && handlerIds.length == 0) {
      handlers = this.handlers;
    }
    else {
      handlers = new Set<MVDHosting.SearchHandler>();
      for (const id of handlerIds) {
        const handler = this.handlersById.get(id);
        if (handler) { handlers.add(handler); }
      }
      for (const topic of searchTopics){
        const topicHandlers = this.handlersByTopic.get(topic);
        if (topicHandlers) {
          topicHandlers.forEach((handler)=> {
            handlers.add(handler);
          });
        }
      }
    }
    const query = this.decodeQueryStringSearch(queryString);
    handlers.forEach((handler)=> {
      promises_array.push(handler.search(query, limit));
    });
    
    return Promise.all(promises_array);        
  }
  
  getHandlers(): Set<MVDHosting.SearchHandler> {
    return this.handlers;
  }

  addSearchHandler(handler: MVDHosting.SearchHandler) {
    this.handlers.add(handler);
    const type = handler.getType();


    let typeHandlers = this.handlersByType.get(type);
    if (!typeHandlers) {
      typeHandlers = new Array<MVDHosting.SearchHandler>();
      this.handlersByType.set(type,typeHandlers);
    }
    typeHandlers.push(handler);

    const topics = handler.getTopics();
    topics.forEach((topic)=> {
      let topicHandlers = this.handlersByTopic.get(topic);
      if (!topicHandlers) {
        topicHandlers = new Array<MVDHosting.SearchHandler>();
        this.handlersByTopic.set(topic,topicHandlers);
      }
      topicHandlers.push(handler);
    });

    this.handlersById.set(handler.getId(), handler);
  }
  /*
  private decodeQueryStringPath(inputStr:string):string{
    const parts:string[] = inputStr.split("&");
    for (const part of parts){
      if (part.toLowerCase().indexOf("path=") !== -1){
        return part.substring(5);
      }
    }
    return "";
  }
  */
  private decodeQueryStringSearch(inputStr:string):string{
    const parts:string[] = inputStr.split("&");
    for (const part of parts){
      if (part.toLowerCase().indexOf("search=")  !== -1){
        return decodeURI(part.substring(7));
      }
    }
    return "";
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/
