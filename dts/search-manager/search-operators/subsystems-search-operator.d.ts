export declare class SubsystemsSearchOperator {
    constructor();
    getHttp(queryString: string, searchCapability: string): Promise<any>;
    getResults(queryString: string, searchCapability: string): Promise<any[]>;
    private static searchAttributes;
    processResults(input: any, query: string, searchCapability: string): any;
}
