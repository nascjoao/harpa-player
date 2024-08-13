import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { PlayerContext, PlayerProvider } from ".";

it("should update the current track", () => {
    const { result } = renderHook(() => useContext(PlayerContext), {
        wrapper: ({ children }) => <PlayerProvider>{children}</PlayerProvider>,
    });

    expect(result.current.currentTrack).toBeNull();

    const track = {
        title: "Test title",
        artist: "Test artist",
        thumbnail: "test.jpg",
        audioUrl: "test.mp3",
    };

    act(() => {
        result.current.play(track);
    });

    expect(result.current.currentTrack).toEqual(track);
});

it("should update the isPlaying state", () => {
    const { result } = renderHook(() => useContext(PlayerContext), {
        wrapper: ({ children }) => <PlayerProvider>{children}</PlayerProvider>,
    });

    expect(result.current.isPlaying).toBe(false);

    act(() => {
        result.current.play({
            title: "Test title",
            artist: "Test artist",
            thumbnail: "test.jpg",
            audioUrl: "test.mp3",
        });
    });

    expect(result.current.isPlaying).toBe(true);

    act(() => {
        result.current.pause();
    });

    expect(result.current.isPlaying).toBe(false);

    act(() => {
        result.current.resume();
    });

    expect(result.current.isPlaying).toBe(true);

    act(() => {
        result.current.stop();
    });

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentTrack).toBeNull();
});

it('should not change the isPlaying state when calling "resume" without a track', () => {
    const { result } = renderHook(() => useContext(PlayerContext), {
        wrapper: ({ children }) => <PlayerProvider>{children}</PlayerProvider>,
    });

    expect(result.current.isPlaying).toBe(false);

    act(() => {
        result.current.resume();
    });

    expect(result.current.isPlaying).toBe(false);
});

it('should not set isPlaying to true when calling "load"', () => {
    const { result } = renderHook(() => useContext(PlayerContext), {
        wrapper: ({ children }) => <PlayerProvider>{children}</PlayerProvider>,
    });

    expect(result.current.isPlaying).toBe(false);

    act(() => {
        result.current.load({
            title: "Test title",
            artist: "Test artist",
            thumbnail: "test.jpg",
            audioUrl: "test.mp3",
        });
    });

    expect(result.current.isPlaying).toBe(false);
});

it('should throw an error when calling "load" when a track is already playing', () => {
    const { result } = renderHook(() => useContext(PlayerContext), {
        wrapper: ({ children }) => <PlayerProvider>{children}</PlayerProvider>,
    });

    expect(result.current.isPlaying).toBe(false);

    act(() => {
        result.current.play({
            audioUrl: "test.mp3",
        });
    });

    expect(result.current.isPlaying).toBe(true);

    expect(() => {
        act(() => {
            result.current.load({
                title: "Test title",
                artist: "Test artist",
                thumbnail: "test.jpg",
                audioUrl: "test.mp3",
            });
        });
    }).toThrow(
        /^A track is already playing. You must stop the current track before loading a new one. If you tried to call \"stop\" and then \"load\", make sure to pass the \"load\" function as an argument of the \"stop\" to ensure the new track is loaded after the current track is stopped.$/,
    );
});
