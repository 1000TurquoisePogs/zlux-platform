export declare class AppSearchOperator {
    appIdentifier: string;
    constructor(appIdentifier: string);
    getHttp(queryString: string, searchCapability: string): Promise<any>;
    getResults(queryString: string, searchCapability: string): Promise<any[]>;
    private static searchObjectAttributes;
    processResults(input: any, query: string, searchCapability: string): any;
}
