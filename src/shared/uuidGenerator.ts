import { v4 as uuidv4 } from "uuid";
import { IdGenerator } from "./idGenerator";

export const uuidGenerator: IdGenerator = uuidv4;