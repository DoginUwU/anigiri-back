import { ISearchItem } from "./search";

interface IPostEngine {
  id: string;
}

interface IPostParams extends IPostEngine {
  site: string;
}

interface IPost {
  id: string;
  image: string;
  artist?: string;
  copyright?: string;
  characters?: Array<string>;
  tags?: Array<string>;
  sames?: Array<ISearchItem>;
}

export type { IPostParams, IPostEngine, IPost };