export declare class RecognizerIndex {
    propertyName: string;
    valueMap: Map<any, RecognitionRule[]>;
    constructor(propertyName: string);
    extend(propertyValue: any, rule: RecognitionRule): void;
}
export declare class ApplicationInstanceWrapper {
    applicationInstanceId: any;
    isIframe: boolean;
    callbacks?: any;
    constructor(applicationInstanceId: any, isIframe: boolean, callbacks?: any);
}
export declare class DispatcherConstants implements ZLUX.DispatcherConstants {
    readonly ActionTargetMode: typeof ActionTargetMode;
    readonly ActionType: typeof ActionType;
}
export declare class Dispatcher implements ZLUX.Dispatcher {
    private instancesForTypes;
    private recognizers;
    private actionsByID;
    private indexedRecognizers;
    launchCallback: any;
    private pluginWatchers;
    postMessageCallback: any;
    readonly constants: DispatcherConstants;
    private log;
    private searchWatchers;
    constructor(logger: ZLUX.Logger);
    registerApplicationCallbacks(plugin: ZLUX.Plugin, applicationInstanceId: any, callbacks: ZLUX.ApplicationCallbacks): void;
    static dispatcherHeartbeatInterval: number;
    clear(): void;
    runHeartbeat(): void;
    deregisterPluginInstance(plugin: ZLUX.Plugin, applicationInstanceId: MVDHosting.InstanceId): void;
    registerPluginInstance(plugin: ZLUX.Plugin, applicationInstanceId: MVDHosting.InstanceId, isIframe: boolean, isEmbedded?: boolean): void;
    setLaunchHandler(launchCallback: any): void;
    setPostMessageHandler(postMessageCallback: any): void;
    matchInList(recognizersForIndex: any[], propertyValue: any, shouldCreate: boolean): any;
    getRecognizers(tuple: any): RecognitionRule[];
    addRecognizerFromObject(predicateObject: ZLUX.RecognitionObjectPropClause | ZLUX.RecognitionObjectOpClause, actionID: string): void;
    private addRecognizerFromObjectInner;
    addRecognizer(predicate: RecognitionClause, actionID: string): void;
    registerPluginWatcher(plugin: ZLUX.Plugin, watcher: ZLUX.PluginWatcher): void;
    deregisterPluginWatcher(plugin: ZLUX.Plugin, watcher: ZLUX.PluginWatcher): boolean;
    registerSearchWatcher(plugin: ZLUX.Plugin, watcher: ZLUX.SearchWatcher): void;
    deregisterSearchWatcher(plugin: ZLUX.Plugin, swatcher: ZLUX.SearchWatcher): boolean;
    registerAction(action: Action): void;
    getAction(recognizer: any): Action | undefined;
    static isAtomicType(specType: string): boolean;
    evaluateTemplateOp(operation: any, eventContext: any, localContext: any): any;
    buildObjectFromTemplate(template: any, eventContext: any): any;
    makeAction(id: string, defaultName: string, targetMode: ActionTargetMode, type: ActionType, targetPluginID: string, primaryArgument: any): Action;
    private getAppInstanceWrapper;
    createAsync(plugin: ZLUX.Plugin, action: Action, eventContext: any): Promise<ApplicationInstanceWrapper>;
    getActionTarget(action: Action, eventContext: any): Promise<ApplicationInstanceWrapper>;
    invokeAction(action: Action, eventContext: any): any;
}
export declare class RecognitionRule {
    predicate: RecognitionClause;
    actionID: string;
    constructor(predicate: RecognitionClause, actionID: string);
    static isReservedKey(key: string): boolean;
    isSourceIndexable(): boolean;
}
export declare enum RecognitionOp {
    AND = 0,
    OR = 1,
    NOT = 2,
    PROPERTY_EQ = 3,
    SOURCE_PLUGIN_TYPE = 4,
    MIME_TYPE = 5
}
export declare class RecognitionClause {
    operation: RecognitionOp;
    subClauses: (RecognitionClause | number | string)[];
    constructor(op: RecognitionOp);
    match(tuple: any): boolean;
}
export declare class RecognizerAnd extends RecognitionClause {
    constructor(...conjuncts: (RecognitionClause)[]);
    match(tuple: any): boolean;
}
export declare class RecognizerOr extends RecognitionClause {
    constructor(...disjuncts: (RecognitionClause | number | string)[]);
    match(tuple: any): boolean;
}
export declare class RecognizerProperty extends RecognitionClause {
    constructor(propertyName: string, propertyValue: string | number);
    match(tuple: any): boolean;
}
export declare enum ActionTargetMode {
    PluginCreate = 0,
    PluginFindUniqueOrCreate = 1,
    PluginFindAnyOrCreate = 2,
    System = 3
}
export declare enum ActionType {
    Launch = 0,
    Focus = 1,
    Route = 2,
    Message = 3,
    Method = 4,
    Minimize = 5,
    Maximize = 6,
    Close = 7
}
export declare class Action implements ZLUX.Action {
    id: string;
    i18nNameKey: string;
    defaultName: string;
    description: string;
    targetMode: ActionTargetMode;
    type: ActionType;
    targetPluginID: string;
    primaryArgument: any;
    constructor(id: string, defaultName: string, targetMode: ActionTargetMode, type: ActionType, targetPluginID: string, primaryArgument: any);
    getDefaultName(): string;
}
