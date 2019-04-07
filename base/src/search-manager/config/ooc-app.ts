/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

export class HelloHandler {//extends MVDHosting.SearchHandler {
  pluginDefinition: any;
  logger: any;
  action: any;
  
  constructor(private context: any) {
//    super(context);
    
    this.pluginDefinition = context.pluginDefinition;
    this.logger = context.logger;
    const dispatcher = ZoweZLUX.dispatcher;
    this.action = dispatcher.makeAction('what',
                                        'what',
                                        dispatcher.constants.ActionTargetMode.PluginCreate,
                                        dispatcher.constants.ActionType.Launch,
                                        this.pluginDefinition.identifier,
                                        {data: {op:'deref',source:'event',path:['data']}});
    
  }

  public search(queryString: string, limit?: number):Promise<MVDHosting.SearchResult> {
    console.log("Test, limit="+limit);
    return new Promise((resolve)=>{
      let entries:MVDHosting.SearchData[] = [];
      let result:MVDHosting.SearchResult = {type: this.getType(),
                                            id: this.getId(),
                                            shortName: this.getShortName(),
                                            longName: this.getLongName(),
                                            entries: entries};
      entries.push({title:"Test", summary:"Launch test with query", data: {action: this.action, argData: {'data': ''+queryString}}});
      
      resolve(result);
    });
  }

  getType(): string { return this.context.definition.type };
  getId(): string { return this.context.id };
  getShortName(): string { return this.context.definition.name };
  getLongName(): string { return this.context.definition.description };
  getTopics(): string[] { return this.context.definition.topics };
  
}

/*
export function helloInit(context: any): MVDHosting.SearchHandler {
  return new HelloHandler(context);
}
*/

export const pluginDefs = [
  {
    identifier: "org.zowe.zlux.sample.react",
    search: {
      fileName: "searchTest.js",
      handlers: [
        {
          name: "hello",
          description: "Execute hello world",
          topics: ["test"],
          type: 'app',
          //do functional check on returned handler to see if it matches type
          initializerName: "helloInit"
        }
        /*
        ,
        {
          name: "launch",
          description: "Launch app",
          topics: ["test","apps"],
          type: "app",
          initializer: function(context: any) {
            return new LaunchHandler(context);
          }
        }
        */
      ]
    }
  }
]
