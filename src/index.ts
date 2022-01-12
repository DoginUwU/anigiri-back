import express from 'express';
import cors from 'cors';
import "express-async-errors";
import dotenv from 'dotenv';
import routes from './routes';
import './libs/engine';
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server is running");
});