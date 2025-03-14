import {Article, ArticleRepository, Slug} from "../domain/article";
import makeSlug from "slug";
import { Clock } from "../../shared/clock";
import { NotFoundError } from "../../error/NotFoundError";
import merge from "lodash.merge";
import { UpdateArticleInput } from "./parseArticleInput";

export type UpdateArticle = (
    slug: string,
    articleInput: UpdateArticleInput,
) => Promise<Article>;

export const updateArticle =
    (articleRepository: ArticleRepository, clock: Clock): UpdateArticle =>
        async (slug: Slug, articleInput: UpdateArticleInput) => {
            const existingArticle = await articleRepository.findBySlug(slug);
            if (!existingArticle) {
                throw new NotFoundError(`Article with slug ${slug} does not exist`);
            }
            const article = merge(existingArticle, articleInput);
            const now = clock();
            article.updatedAt = now;
            article.slug = makeSlug(article.title);

            await articleRepository.update(article);

            return article;
        };