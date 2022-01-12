import { CheerioAPI } from "cheerio";
import { IPost, IPostEngine } from "../../@types/post";
import { ISearch, ISearchEngine } from "../../@types/search";
import { getPage } from "../../utils/page";
import { queryToJson } from "../../utils/url";
import Engine from "../engine";

class Gelbooru extends Engine {
  constructor() {
    super("gelbooru", "https://gelbooru.com");
  }

  getImages(search: CheerioAPI) {
    return search("article")
      .toArray()
      .map((item) => {
        const url = search(item).find("a").attr("href");
        const id = queryToJson(url || "").id;

        const post = {
          id,
          url,
          image: search(item).find("img").attr("src"),
        };

        return post;
      });
  }

  async searchByTags({ tags, req, page }: ISearchEngine): Promise<ISearch> {
    const address = `index.php?page=post&s=list&tags=${tags}&pid=${
      (parseInt(page) - 1) * 42
    }`;
    const search = await getPage(this.url, address);

    const images = this.getImages(search);

    const currentPage = parseInt(
      search("#paginator").first().find("b").first().text()
    );

    const fullUrl = req
      ? req.protocol + "://" + req.get("host") + req.originalUrl
      : "";

    const nextPageUrl = fullUrl.replace(
      `&page=${currentPage}`,
      `&page=${currentPage + 1}`
    );

    return {
      currentPage: currentPage,
      nextPage: currentPage + 1,
      nextPageUrl,
      items: images,
    };
  }

  async getPostById({ id }: IPostEngine): Promise<IPost> {
    const address = `index.php?page=post&s=view&id=${id}`;
    const search = await getPage(this.url, address);

    const image = search("picture").first().find("img").attr("src");
    const artist = search(".tag-type-artist").first().find("a").last().text();
    const copyright = search(".tag-type-copyright")
      .first()
      .find("a")
      .last()
    .text();
      
    const tags = search(".tag-type-general").toArray().map((item) => {
        return search(item).find("a").last().text();
    });
      
    if(!image) throw new Error("Image not found");
      
    return {
      id,
      image,
      artist,
      copyright,
      tags
    };
  }
}

export default Gelbooru;