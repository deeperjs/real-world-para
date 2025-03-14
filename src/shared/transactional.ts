import {Kysely} from "kysely";
import {DB} from "../dbTypes";

export const transactional =
    (db: Kysely<DB>) =>
        <T extends Record<string, any>>(
            compositionRoot: (db: Kysely<DB>) => T,
        ): T => {
            const nonTransactionalRoot = compositionRoot(db);
            const transactionalRoot: Partial<T> = {};
            for (const key in nonTransactionalRoot) {
                if (typeof nonTransactionalRoot[key] === "function") {
                    transactionalRoot[key] = ((...args: any[]) => {
                        return db.transaction().execute((trx) => {
                            const transactionalRoot = compositionRoot(trx);
                            return transactionalRoot[key](...args);
                        });
                    }) as T[typeof key];
                } else {
                    transactionalRoot[key] = nonTransactionalRoot[key];
                }
            }
            return transactionalRoot as T;
        };