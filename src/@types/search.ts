import { Request } from "express";

interface ISearchEngine {
    tags: string;
    page: string;
    req?: Request;
}

interface ISearchParams extends ISearchEngine {
  site: string;
}

interface ISearch {
    currentPage: number;
    nextPage: number;
    nextPageUrl?: string;
    items: Array<ISearchItem>;
}

interface ISearchItem {
    id?: string;
    url?: string;
    image?: string;
    tags?: string;
}

export type { ISearchParams, ISearch, ISearchEngine, ISearchItem };
