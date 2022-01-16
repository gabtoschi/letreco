import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const STATISTICS_KEY = 'statistics';

export interface GuessDistribution {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  X: number;
}

export type GuessDistributionKeys = keyof GuessDistribution;

export interface Statistics {
  distribution: GuessDistribution;
  currentStreak: number;
  maxStreak: number;
}

const statisticsInit: Statistics = {
  distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, X: 0 },
  currentStreak: 0,
  maxStreak: 0,
}

export type StatisticsHook = [Statistics, (newStatistics: Partial<Statistics>) => void];

export const StatisticsContext = React.createContext<StatisticsHook>(
  [statisticsInit, () => {}],
);

export function useStatistics(): StatisticsHook {
  return useLocalStorage(STATISTICS_KEY, statisticsInit);
}