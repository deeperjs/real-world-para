import { Article, ArticleRepository } from "../domain/article";
import assert from "assert";

export const articleRepositoryContract = (
    variant: string,
    repository: ArticleRepository
) => {
    describe(`Article repository contract: ${variant}`, function () {
        beforeEach(async () => {
            await repository.deleteAll();
        });
        it("should create articles", async function () {
            const article: Article = {
                id: "200db642-a014-46dc-b678-fc2777b4b301",
                slug: "the-title",
                title: "The title",
                body: "body",
                tagList: ["tag1", "tag2"],
                description: "description",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await repository.create(article);
            const result = await repository.findBySlug("the-title");
            assert.deepStrictEqual(result, article);
        });
        it("should update articles", async function () {
            const article: Article = {
                id: "200db642-a014-46dc-b678-fc2777b4b301",
                slug: "the-title",
                title: "The title",
                body: "body",
                tagList: ["tag1", "tag2"],
                description: "description",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await repository.create(article);
            await repository.update({ ...article, body: "updated body" });
            const result = await repository.findBySlug("the-title");
            assert.deepStrictEqual(result!.body, "updated body");
        });
        it("should return null when article not found", async function () {
            const result = await repository.findBySlug("the-title");
            assert.deepStrictEqual(result, null);
        });
    });
};