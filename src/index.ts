import express from 'express';
import cors from 'cors';
import "express-async-errors";
import routes from './routes';
import './libs/engine';
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorHandler);

app.listen(3000, () => { 
    console.log('Server is running on port 3000');
});