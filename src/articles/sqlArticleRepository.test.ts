import { createDb } from "../db";
import { sqlArticleRepository } from "./sqlArticleRepository";
import { articleRepositoryContract } from "./articleRepositoryContract.test";

const db = createDb("postgres://user:secret@localhost:5432/conduit");

articleRepositoryContract("SQL", sqlArticleRepository(db));