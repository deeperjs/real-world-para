import makeSlug from "slug";
import omit from "lodash.omit";
import {NotFoundError} from "./NotFoundError";
import merge from "lodash.merge";
import {incrementIdGenerator} from "./incrementIdGenerator";
import {Router} from "express";
import {Article} from "./article";
import {inMemoryArticleRepository} from "./inMemoryArticleRepository";
import {createArticle} from "./createArticle";
import {clock} from "./clock";
import {ArticleInput, UpdateArticleInput} from "./parseArticleInput";
import {updateArticle} from "./updateArticle";
import {createDb} from "./db";
import {sqlArticleRepository} from "./sqlArticleRepository";
import {uuidGenerator} from "./uuidGenerator";

const articleIdGenerator = process.env.DATABASE_URL ? uuidGenerator : incrementIdGenerator(String);
const articleRepository = process.env.DATABASE_URL ? sqlArticleRepository(createDb(
    process.env.DATABASE_URL
)) : inMemoryArticleRepository();

export const articlesRouter = Router();

articlesRouter.post("/api/articles", async (req, res, next) => {
    // HTTP
    const input = ArticleInput.parse(req.body.article);
    // TS
    const article = await createArticle(articleRepository, articleIdGenerator, clock)(input);
    // HTTP
    res.json({ article: omit(article, "id") });
});
articlesRouter.put("/api/articles/:slug", async (req, res, next) => {
    // HTTP
    const articleInput = UpdateArticleInput.parse(req.body.article);
    const slug = req.params.slug;

    // TS
    const article = await updateArticle(articleRepository, clock)(
        slug,
        articleInput
    );

    // HTTP
    res.json({ article: omit(article, "id") });
});
articlesRouter.get("/api/articles/:slug", async (req, res, next) => {
    const slug = req.params.slug;
    const existingArticle = await articleRepository.findBySlug(slug);
    if (!existingArticle) {
        throw new NotFoundError(`Article with slug ${slug} does not exist`);
    }
    res.json({ article: omit(existingArticle, "id") });
});