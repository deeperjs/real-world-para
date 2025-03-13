// tiny types

export type Tag = string;
export type ArticleId = string;
export type Slug = string;
// tiny types
// type Slug = `${string}_slug`;
// type Slug = string & {_kind: 'slug'};
// const Slug = (slug: string) => slug as Slug;
// const x: Slug = Slug("abc");

export type Article = {
    body: string;
    description: string;
    tagList: Array<string>;
    title: string;
    slug: Slug;
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ArticleRepository = {
    create(article: Article): Promise<void>;
    update(article: Article): Promise<void>;
    findBySlug(slug: string): Promise<Article | null>;
};

