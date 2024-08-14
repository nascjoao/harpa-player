import React from "react";
import { PlayerContext } from "@/contexts/player";
import { type Track } from "../..";

export default function usePlayer(track?: Track) {
    const context = React.useContext(PlayerContext);
    const loading = React.useRef(true);

    React.useEffect(() => {
        if (track && loading.current) {
            context.load(track);
            loading.current = false;
        }
    }, [track]);

    return context;
}
