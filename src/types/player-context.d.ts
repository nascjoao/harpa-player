type Track = {
    title?: string | null;
    artist?: string | null;
    thumbnail?: string | null;
    audioUrl: string;
};

type PlayerContextType = {
    isPlaying: boolean;
    currentTrack: Track | null;
    play: (track: Track) => void;
    pause: () => void;
    resume: () => void;
    stop: (callback?: Function) => void;
    load: (track: Track) => void;
};
