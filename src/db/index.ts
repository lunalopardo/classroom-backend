import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);
export const index = drizzle(sql);
// Export pool as null for consistency in index.ts if needed, 
// though the prompt says it only exists for other drivers.
export const pool = null; 
