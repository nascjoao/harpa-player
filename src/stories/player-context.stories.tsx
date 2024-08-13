import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { usePlayer, PlayerProvider } from "@harpa-player";

const meta: Meta = {
    title: "Contexts/Player",
    decorators: [
        (Story) => (
            <PlayerProvider>
                <Story />
            </PlayerProvider>
        ),
    ],
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryFn<typeof meta>;

export const Primary: Story = () => {
    const { isPlaying, play, pause } = usePlayer();

    const track = {
        title: "Test title",
        artist: "Test artist",
        thumbnail: "test.jpg",
        audioUrl: "test.mp3",
    };

    return (
        <div className="grid gap-4 min-w-40">
            <div className="flex items-center gap-2">
                {isPlaying && (
                    <span className="relative flex size-4">
                        <span className="motion-safe:animate-[ping_1s_ease-in_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="motion-safe:animate-[ping_1s_ease-in_300ms_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full w-full h-full bg-emerald-400"></span>
                    </span>
                )}
                Player is {isPlaying ? "playing" : "paused"}
            </div>
            <button
                className="border px-3 py-1 rounded-md bg-neutral-50"
                onClick={() => (isPlaying ? pause() : play(track))}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};
