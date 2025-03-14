import {inMemoryArticleRepository} from "../infrastructure/inMemoryArticleRepository";
import {IdGenerator} from "../../shared/idGenerator";
import {Article} from "../domain/article";
import makeSlug from "slug";
import {Clock} from "../../shared/clock";
import {ArticleInput} from "./parseArticleInput";

export type CreateArticle = (input: ArticleInput) => Promise<Article>;

// use case/workflow/application service/application logic
export const createArticle =
    (
        articleRepository: ReturnType<typeof inMemoryArticleRepository>,
        articleIdGenerator: IdGenerator,
        clock: Clock
    ): CreateArticle =>
        async (input: ArticleInput) => {
            const now = clock();
            const article: Article = {
                body: input.body,
                description: input.description,
                tagList: input.tagList,
                title: input.title,
                slug: makeSlug(input.title),
                id: articleIdGenerator(),
                createdAt: now,
                updatedAt: now,
            };
            await articleRepository.create(article);
            return article;
        };


// class CreateArticleService {
//     constructor(deps) {
//     }
//     createArticle(data) {}
// }
//
// const createArticle = (deps) => (data) => {};
//
// class UpdateArticleService {
//     constructor(deps) {
//     }
//     updateArticle(data) {}
// }