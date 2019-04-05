export declare class WebSearchHandler implements MVDHosting.SearchHandler {
    private id;
    private shortName;
    private longName;
    private topics;
    protected title: string;
    protected summary: string;
    protected queryParm: string;
    protected queryHref: string;
    protected resultHref: string;
    protected requestType: number;
    protected resultHrefPrefix?: string | undefined;
    protected limitParm?: string | undefined;
    constructor(id: string, shortName: string, longName: string, topics: string[], title: string, summary: string, queryParm: string, queryHref: string, resultHref: string, requestType: number, resultHrefPrefix?: string | undefined, limitParm?: string | undefined);
    private addLimit;
    private constructUrl;
    private getHttp;
    protected stripFormatting(input: string): string;
    private processResults;
    search(queryString: string, limit?: number): Promise<MVDHosting.SearchResult>;
    getType(): string;
    getId(): string;
    getLongName(): string;
    getShortName(): string;
    getTopics(): string[];
}
