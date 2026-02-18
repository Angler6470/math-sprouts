import { createParentSettingsStore } from '../sprouts-engine';

const parentSettingsStore = createParentSettingsStore({
  storageKey: 'math_sprouts_parent_settings',
  allowedModes: ['balance', 'garden', 'pollinator']
});

export const {
  loadParentSettings,
  saveParentSettings,
  isThemeAllowed,
  isDifficultyAllowed,
  isModeAllowed
} = parentSettingsStore;
