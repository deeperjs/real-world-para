import { uuidGenerator } from "../../shared/uuidGenerator";
import { incrementIdGenerator } from "../../shared/incrementIdGenerator";
import { sqlArticleRepository } from "../infrastructure/sqlArticleRepository";
import { inMemoryArticleRepository } from "../infrastructure/inMemoryArticleRepository";
import {CreateArticle, createArticle} from "./createArticle";
import { clock } from "../../shared/clock";
import {UpdateArticle, updateArticle} from "./updateArticle";
import { Kysely } from "kysely";
import { DB } from "../../dbTypes";
import {transactional} from "../../shared/transactional";

export const sqlArticlesCompositionRoot = (db: Kysely<DB>) => {
    const articleIdGenerator = uuidGenerator;
    const articleRepository = sqlArticleRepository(db);
    const create: CreateArticle = createArticle(articleRepository, articleIdGenerator, clock);
    const update = updateArticle(articleRepository, clock);
    return { create, update, articleRepository };
};
export const inMemoryArticlesCompositionRoot = () => {
    const articleIdGenerator = incrementIdGenerator(String);
    const articleRepository = inMemoryArticleRepository();
    const create = createArticle(articleRepository, articleIdGenerator, clock);
    const update = updateArticle(articleRepository, clock);
    return { create, update, articleRepository };
};
export const articlesCompositionRoot = (db: Kysely<DB> | null) => {
    return db
        ? transactional(db)(sqlArticlesCompositionRoot)
        : inMemoryArticlesCompositionRoot();
};