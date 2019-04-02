import { FileSearchOperator } from './file-search-operator';
export declare class FolderSearchOperator {
    fileSearchOperator: FileSearchOperator;
    constructor();
    getHttpFolder(queryString: string, path: string, searchCapability: string): Promise<any>;
    getResults(queryString: string, path: string, searchCapability: string): Promise<any[]>;
    processResFiles(results: any[]): any;
    processFolderResults(input: any, query: string, searchCapability: string, self: any): Promise<any[]>;
}
