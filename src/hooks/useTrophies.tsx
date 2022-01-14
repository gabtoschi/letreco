import React from "react";
import { UnlockedTrophy } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

const SAVED_TROPHIES_KEY = 'savedTrophies';

export interface SavedTrophies {
  unlockedTrophies: UnlockedTrophy[];
}

const savedTrophiesInit: SavedTrophies = { unlockedTrophies: [] };

export type SavedTrophiesHook = [SavedTrophies, (newTrophies: UnlockedTrophy[]) => void];

export const SavedTrophiesContext = React.createContext<SavedTrophiesHook>(
  [savedTrophiesInit, () => {}],
);

export function useTrophies(): SavedTrophiesHook {
  const [trophiesObject, setTrophiesObject] = useLocalStorage(SAVED_TROPHIES_KEY, savedTrophiesInit);

  return [trophiesObject, (newTrophies: UnlockedTrophy[]) => {
    const fullTrophies = [...trophiesObject.unlockedTrophies, ...newTrophies];

    setTrophiesObject({ unlockedTrophies: fullTrophies });
  }];
}