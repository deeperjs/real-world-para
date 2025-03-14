import express from "express";
import cors from "cors";
import {errorHandler, notFoundHandler} from "./errorHandler";
import {Config} from "./config";
import {createArticlesRouter} from "./articlesRouter";

export const createApp = (config: Config) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use(createArticlesRouter(config));

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};
