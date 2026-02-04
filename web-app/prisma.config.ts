import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'lib/db/prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
});
