import 'server-only';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let cachedClient: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (cachedClient) {
    return cachedClient;
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured. Operating in fallback mode.');
  }

  cachedClient = neon(databaseUrl);
  return cachedClient;
}

/**
 * Tagged template SQL query executor backed by Neon Serverless PostgreSQL.
 * Lazily initializes the connection so builds and static analysis succeed even when DATABASE_URL is absent.
 */
export const sql = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => {
  const client = getClient();
  return client(strings, ...values);
}) as unknown as NeonQueryFunction<false, false>;
