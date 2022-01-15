import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const GLOBAL_SETTINGS_KEY = 'globalSettings';

export interface GlobalSettings {
  isColorblindModeActive: boolean;
}

const GlobalSettingsInitialValue: GlobalSettings = {
  isColorblindModeActive: false,
}

export type GlobalSettingsHook = [GlobalSettings, (newSettings: Partial<GlobalSettings>) => void];

export const GlobalSettingsContext = React.createContext<GlobalSettingsHook>(
  [GlobalSettingsInitialValue, () => {}],
);

export function useGlobalSettings(): GlobalSettingsHook {
  const [settings, setSettings] = useLocalStorage<GlobalSettings>(
    GLOBAL_SETTINGS_KEY,
    GlobalSettingsInitialValue
  );

  return [settings, (newSettings => {
    const updatedSettings: GlobalSettings = {
      ...settings, ...newSettings,
    };

    setSettings(updatedSettings);
  })]
}