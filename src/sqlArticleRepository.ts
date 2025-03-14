import { ArticleRepository } from "./article";
import { Kysely } from "kysely";
import { DB } from "./dbTypes";

export const sqlArticleRepository = (db: Kysely<DB>): ArticleRepository => {
    return {
        async create(article) {
            await db.insertInto('article').values(article).execute();
            if(article.tagList.length > 0) {
                await db.insertInto('tags').values(article.tagList.map(tag => ({articleId: article.id, name: tag}))).execute();
            }
        },
        async update(article) {
            await db.updateTable('article').set(article).where('article.id', '=', article.id).execute();
            await db.deleteFrom('tags').where('tags.articleId', '=', article.id).execute();
            if(article.tagList.length > 0) {
                await db.insertInto('tags').values(article.tagList.map(tag => ({articleId: article.id, name: tag}))).execute();
            }
        },
        async findBySlug(slug) {
            const article = await db.selectFrom('article').where('slug', '=', slug).selectAll().executeTakeFirst();
            if(!article) return null;
            const tags = await db.selectFrom('tags').where('articleId', '=', article.id).selectAll().execute();
            return {
                ...article,
                tagList: tags.map(tag => tag.name)
            };
        },
    };
};