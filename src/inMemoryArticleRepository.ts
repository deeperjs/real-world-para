import {Article, ArticleRepository} from "./article";
import {undefined} from "zod";

export const inMemoryArticleRepository = (): ArticleRepository => {
    let articles: Record<string, Article> = {};
    // const articles: {[key: string]: Article} = {};
    // const articles: Array<Article> = [];
    return {
        async deleteAll(): Promise<void> {
            articles = {};
        },
        async create(article) {
            articles[article.id] = article;
        },
        async update(article) {
            articles[article.id] = article;
        },
        async findBySlug(slug) {
            const article = Object.values(articles).find(
                (article) => article.slug === slug
            );
            return article ?? null;
        }
    };
};