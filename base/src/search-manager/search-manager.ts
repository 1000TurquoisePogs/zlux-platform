/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import { makeWebSearchHandler } from './search-handlers/web-search-handler';

export class SearchManager implements ZLUX.SearchManager, MVDHosting.LogoutActionInterface {

  private handlers: Set<MVDHosting.SearchHandler> = new Set<MVDHosting.SearchHandler>();
  private handlersByType = new Map<string, MVDHosting.SearchHandler[]>();
  private handlersByTopic = new Map<string, MVDHosting.SearchHandler[]>();
  private handlersById = new Map<string, MVDHosting.SearchHandler>();
  // TODO consider creating a type for config when more solid
  
  constructor() { }

  onLogout(): boolean {
    this.handlers.clear();
    this.handlersByType.clear();
    this.handlersByTopic.clear();
    this.handlersById.clear();
    return true;
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
    let handlersProcessed = 0;
    
    handlers.forEach((handler)=> {
      promises_array.push(handler.search(query, limit));
    });
    
    return Promise.all(promises_array).catch((error)=> {
      console.warn(`A handler encountered error=`,error);
      return promises_array;
    });        
  }
  
  getHandlers(): Set<MVDHosting.SearchHandler> {
    return this.handlers;
  }

  loadHandlers(plugin: ZLUX.Plugin1_1): Promise<number> {
    return new Promise((resolve)=> {
      if (plugin.getSearchCapabilities) {
        const searchDef = plugin.getSearchCapabilities();
        if (searchDef) {
          console.log(`plugin (id=${plugin.getIdentifier()}) has search def`,searchDef);

          let initializeHandlers = (file?: any) => {
            let count = 0;
            for (let i = 0; i < searchDef.handlers.length; i++) {
              const handlerDef = searchDef.handlers[i];
              this.initializeSearchHandler(plugin,
                                           handlerDef,
                                           file ? file[handlerDef.handlerFactory] : undefined);
              count++;
            }
            resolve(count);
          };

          if (searchDef.filename) {
          (window as any).requirejs([
            ZoweZLUX.uriBroker.pluginResourceUri(plugin, searchDef.filename)
          ], (file: any)=> {
            initializeHandlers(file);
          });
          } else {
            initializeHandlers();
          }
        } else { resolve(0); }
      } else { resolve(0); }
    });
  }

  private initializeSearchHandler(plugin: any, handlerDef: any, initializer?: any): boolean {
    const id = plugin.getIdentifier()+":search."+handlerDef.name;
    const context = {
      definition: handlerDef,
      id: id,
      pluginDefinition: plugin,
      logger: ZoweZLUX.logger.makeComponentLogger(id)
    }
    if (!initializer) {
      initializer = this.getInternalInitializer(handlerDef);
      if (!initializer) {
        return false;
      }
    }
    try {
      const handler = initializer(context);
      if (handler) {
        console.log(`Successfully initialized search handler id=${id}`);
        this.addSearchHandler(handler);
      }
    } catch (e) {
      console.warn(`Could not load search handler ${handlerDef.name} for plugin ${plugin.getIdentifier()}`);
      return false;
    }
    return true;
  }

  private getInternalInitializer(handlerDef: any): any {
    switch (handlerDef.type) {
      case 'web-json':
        return makeWebSearchHandler;
      default:
        console.warn(`Cannot handle unknown search handler type=${handlerDef.type}`);
    }
    return null;
  }

  addSearchHandler(handler: MVDHosting.SearchHandler) {
    this.handlers.add(handler);
    const def = handler.getDefinition()
    const type = def.type;


    let typeHandlers = this.handlersByType.get(type);
    if (!typeHandlers) {
      typeHandlers = new Array<MVDHosting.SearchHandler>();
      this.handlersByType.set(type,typeHandlers);
    }
    typeHandlers.push(handler);

    const topics = def.topics;
    topics.forEach((topic)=> {
      let topicHandlers = this.handlersByTopic.get(topic);
      if (!topicHandlers) {
        topicHandlers = new Array<MVDHosting.SearchHandler>();
        this.handlersByTopic.set(topic,topicHandlers);
      }
      topicHandlers.push(handler);
    });

    this.handlersById.set(def.id, handler);
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
