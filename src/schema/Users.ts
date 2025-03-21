import { relations, sql } from 'drizzle-orm';
import { pgTable, varchar, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { Profiles } from './Profiles.js';

export const Users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  verified: boolean('verified').notNull().default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export const usersRelation = relations(Users, ({ one }) => ({
  profile: one(Profiles, {
    fields: [Users.id],
    references: [Profiles.userId],
  }),
}));
