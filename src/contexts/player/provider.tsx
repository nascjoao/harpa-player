import React from "react";
import { PlayerContext } from ".";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);

    const play = (track: Track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    const resume = () => {
        if (!currentTrack) {
            return;
        }
        setIsPlaying(true);
    };

    const stop = () => {
        setCurrentTrack(null);
        setIsPlaying(false);
    };

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                currentTrack,
                play,
                pause,
                resume,
                stop,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}
