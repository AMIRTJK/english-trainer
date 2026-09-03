import type { VocabularyBank } from '../../types';
import { BEGINNER_LEVEL_ID } from '../meta';
import { contrasts, sounds } from './sounds';
import { words } from './words';

export const vocabulary: VocabularyBank = {
  levelId: BEGINNER_LEVEL_ID,
  sounds,
  contrasts,
  words,
};

export { contrastsFor, soundByKey } from './sounds';

