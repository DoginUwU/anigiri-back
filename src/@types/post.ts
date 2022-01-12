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
  tags?: Array<string>;
}

export type { IPostParams, IPostEngine, IPost };