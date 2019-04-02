import { SearchResult } from '../models/search-result.model';
export declare class WebSearchOperator {
    href: string;
    query: string[];
    queryHref: string;
    title: string;
    summary: string;
    type: string;
    count: number | null;
    constructor(type: string, title: string, summary: string, href: string, count: number | null, query: string[], queryHref: string);
    addCount(): string;
    addQueryStr(queryString: string): string;
    constructUrl(queryString: string): string;
    getHttp(queryString: string, searchCapability: string): Promise<SearchResult>;
    stripFormatting(input: string): string;
    processResults(input: any, query: string, searchCapability: string, instance: WebSearchOperator): SearchResult;
    getResults(queryString: string, searchCapability: string): Promise<SearchResult>;
}
