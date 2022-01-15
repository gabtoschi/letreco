export function completeArray<T>(
  array: T[], newSize: number, elementToComplete: T
): T[] {
  return [...array, ...Array(newSize - array.length).fill(elementToComplete)];
}

export function getLast<T>(array: T[]) {
  return array[array.length - 1];
}