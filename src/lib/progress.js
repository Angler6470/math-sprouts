import { createProgressStore } from '../sprouts-engine';

const progressStore = createProgressStore({
  storageKey: 'math_sprouts_progress',
  modes: ['balance', 'garden', 'pollinator']
});

export const { loadProgress, saveProgress, recordAnswer, recordSessionStart, recordSessionEnd } = progressStore;
