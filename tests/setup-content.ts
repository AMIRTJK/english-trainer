import { loadAllLevels } from '@content/registry';

// Level content is loaded on demand in the app; the tests read every level, so
// it is all loaded before any test file runs.
await loadAllLevels();
