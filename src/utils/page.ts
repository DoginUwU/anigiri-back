import axios, { AxiosRequestHeaders } from "axios";
import cheerio, { CheerioAPI } from "cheerio";

const getPage = async (
  url: string,
  params: string,
  headers?: AxiosRequestHeaders
): Promise<CheerioAPI> => {
  return axios
    .get(`${url}/${params}`, {
      headers,
    })
    .then((response) => {
      return cheerio.load(response.data);
    });
};

export { getPage };
