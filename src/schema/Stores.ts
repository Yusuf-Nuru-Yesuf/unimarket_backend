import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { Profiles } from './Profiles.js';
import { relations, sql } from 'drizzle-orm';
import { StoreRequests } from './StoreRequest.js';

export const storeStatusEnum = pgEnum('store_statuses', [
  'incomplete',
  'active',
  'inactive',
  'suspended',
]);

export const Stores = pgTable('stores', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => Profiles.id, { onDelete: 'cascade' })
    .unique(),
  storeName: varchar('store_name', { length: 100 }).notNull(),
  description: varchar('description', { length: 500 }),
  storeAddress: varchar('store_address', { length: 500 }).notNull(),
  storeStatus: storeStatusEnum('store_status').default('incomplete').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export const storeRelation = relations(Stores, ({ one }) => ({
  owner: one(Profiles, {
    fields: [Stores.ownerId],
    references: [Profiles.id],
  }),

  request: one(StoreRequests, {
    fields: [Stores.id],
    references: [StoreRequests.storeId],
  }),
}));
