import { createContext, useContext } from "react";

/** true once the first-visit loading screen has finished (or was skipped). */
export const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);
