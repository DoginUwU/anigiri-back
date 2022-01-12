import { Router } from "express";
import { celebrate, Segments, Joi, errors } from 'celebrate';
import { searchByTags, getPostById } from "../controllers/search";
import { engines } from "../libs/engine";

const routes = Router();


routes.get("/", (req, res) => {
  res.json({
      app: "Anigiri",
      running: true,
      availableSites: engines.getAll().map(engine => engine.name),
    });
});

routes.get(
  "/search",
  celebrate({
    [Segments.QUERY]: {
      tags: Joi.string().required(),
      site: Joi.string().required(),
      page: Joi.number().default(1),
    },
  }),
  async (req, res) => {
      const { tags, site, page }: any = req.query;

    res.json(await searchByTags({ tags, site, req, page }));
  }
);

routes.get(
  "/post",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().required(),
      site: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const { id, site }: any = req.query;

    res.json(await getPostById({ id, site }));
  }
);

routes.use(errors());

export default routes;