import { createContext, ReactNode, useContext, useState } from "react";
import { WORD_SIZE } from "../shared/GameConstants";

type UnderlinePositionProps = {
  children: ReactNode;
}

export type UnderlinePositionData = {
  underlinePosition : number,
  updateUnderlinePosition : (increaseCount : boolean) => void,
  setSpecificUnderlinePosition : (position : number) => void,
  backspaceUnderlinePosition : () => void
};

export const UnderlinePosition = createContext({} as UnderlinePositionData);

export function UnderlinePositionProvider({ children }: UnderlinePositionProps) : JSX.Element {
  const [underlinePosition, setUnderlinePosition] = useState(0);

  const updateUnderlinePosition = (increaseCount : boolean) : void => {
    if (increaseCount && underlinePosition === WORD_SIZE - 1)
    {
      setSpecificUnderlinePosition(0);
      return;
    };
    if (!increaseCount && underlinePosition === 0) return;

    const value = increaseCount ? 1 : -1;
    setUnderlinePosition(x => x += value);
  }

  const setSpecificUnderlinePosition = (position : number) : void => {
    if (position > WORD_SIZE) return;
    if (position < 0) return;

    setUnderlinePosition(position);
  }

  const backspaceUnderlinePosition = () : void => {
    if(underlinePosition === 0)
      return;

    setUnderlinePosition(x => x -= 1);
  }

  return (
    <UnderlinePosition.Provider
      value={{
        underlinePosition,
        updateUnderlinePosition,
        setSpecificUnderlinePosition,
        backspaceUnderlinePosition
      }}
    >
      {children}
    </UnderlinePosition.Provider>
  );
}

export const useUnderlinePosition = () : UnderlinePositionData => {
  return useContext(UnderlinePosition);
};