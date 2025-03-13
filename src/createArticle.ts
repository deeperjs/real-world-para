import {inMemoryArticleRepository} from "./inMemoryArticleRepository";
import {IdGenerator} from "./idGenerator";
import {Article} from "./article";
import makeSlug from "slug";
import {Clock} from "./clock";

export type ArticleInput = {
    body: string;
    description: string;
    tagList: string[];
    title: string;
};

// use case/workflow/application service/application logic
export const createArticle =
    (
        articleRepository: ReturnType<typeof inMemoryArticleRepository>,
        articleIdGenerator: IdGenerator,
        clock: Clock
    ) =>
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