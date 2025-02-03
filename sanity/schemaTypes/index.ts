import { type SchemaTypeDefinition } from 'sanity';
import users from './users';
import video from './video';
import comment from './comment';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [users, comment, video],
}
