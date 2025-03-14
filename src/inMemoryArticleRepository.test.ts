import { articleRepositoryContract } from "./articleRepositoryContract.test";
import { inMemoryArticleRepository } from "./inMemoryArticleRepository";


articleRepositoryContract("in-memory", inMemoryArticleRepository());