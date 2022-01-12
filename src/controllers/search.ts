import { IPost, IPostParams } from "../@types/post";
import { ISearch, ISearchParams } from "../@types/search";
import { engines } from "../libs/engine";

const searchByTags = async ({ tags, site, req, page }: ISearchParams): Promise<ISearch> => {
    const engine = engines.get(site);
    if (!engine) throw new Error(`Engine ${site} not found`);

    return engine.searchByTags({ tags, req, page });
};

const getPostById = async ({ id, site }: IPostParams): Promise<IPost> => {
  const engine = engines.get(site);
  if (!engine) throw new Error(`Engine ${site} not found`);

  return engine.getPostById({ id });
};


export { searchByTags, getPostById };