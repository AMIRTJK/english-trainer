import type { VocabularyBank } from '../../types';
import { ELEMENTARY_LEVEL_ID } from '../meta';
import { contrasts, sounds } from './sounds';
import { words } from './words';

export const vocabulary: VocabularyBank = {
  levelId: ELEMENTARY_LEVEL_ID,
  sounds,
  contrasts,
  words,
};

export { contrastsFor } from './sounds';
