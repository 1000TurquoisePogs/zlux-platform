export declare class FileSearchOperator {
    constructor();
    getHttp(queryString: string, path: string, searchCapability: string): Promise<any>;
    getResults(queryString: string, path: string, searchCapability: string): Promise<any[]>;
    processResults(input: any, query: string, path: string, searchCapability: string): any;
}
