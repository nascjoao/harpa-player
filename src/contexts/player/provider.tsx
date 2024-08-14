import React from "react";
import { PlayerContext } from ".";
import { type Track } from "../..";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
    const audio = React.useRef<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        if (!currentTrack) return;
        audio.current = new Audio(currentTrack.audioUrl);
    }, [currentTrack]);

    const normalizeTrack = (track: Track) => {
        track.title = track.title || null;
        track.artist = track.artist || null;
        track.thumbnail = track.thumbnail || null;
    };

    const play = (track: Track) => {
        normalizeTrack(track);
        setCurrentTrack(track);
        setIsPlaying(true);
        audio.current?.play();
    };

    const pause = () => {
        setIsPlaying(false);
        audio.current?.pause();
    };

    const resume = () => {
        if (!currentTrack) {
            return;
        }
        setIsPlaying(true);
        audio.current?.play();
    };

    const stop = (callback?: Function) => {
        setCurrentTrack(() => {
            setIsPlaying(false);
            audio.current?.pause();
            audio.current = null;
            if (callback) {
                callback();
            }
            return null;
        });
    };

    const load = (track: Track) => {
        if (isPlaying && audio.current) {
            throw new Error(
                'A track is already playing. You must \
stop the current track before loading a new one. If you tried \
to call "stop" and then "load", make sure to pass the "load" \
function as an argument of the "stop" to ensure the new track \
is loaded after the current track is stopped.',
            );
        }
        normalizeTrack(track);
        setCurrentTrack(track);
    };

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                duration: audio.current?.duration ?? null,
                currentTime: audio.current?.currentTime ?? null,
                currentTrack,
                play,
                pause,
                resume,
                stop,
                load,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}
