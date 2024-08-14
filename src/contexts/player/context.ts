import React from "react";
import { type PlayerContextType } from "../..";

export const PlayerContext = React.createContext<PlayerContextType>(
    {} as PlayerContextType,
);
