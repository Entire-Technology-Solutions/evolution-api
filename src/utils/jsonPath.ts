import { configService, Database } from '@config/env.config';

export function isMysql(): boolean {
  return configService.get<Database>('DATABASE').PROVIDER === 'mysql';
}

/**
 * Builds the `path` of a Prisma JSON filter for the active database provider.
 * PostgreSQL expects a string array (['key', 'id']); MySQL expects a JSONPath string ('$.key.id').
 */
export function jsonPath(...segments: string[]): any {
  return isMysql() ? `$.${segments.join('.')}` : segments;
}
