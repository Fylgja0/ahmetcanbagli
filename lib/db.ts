import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

export const sql: NeonQueryFunction<false, false> = neon(databaseUrl);
