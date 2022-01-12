import axios from "axios";
import cheerio, { CheerioAPI } from "cheerio";

const getPage = async (url: string, params: string): Promise<CheerioAPI> => {
    return axios.get(`${url}/${params}`).then((response) => {
    return cheerio.load(response.data);
  });
};

export { getPage };
