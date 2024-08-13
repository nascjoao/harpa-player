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
