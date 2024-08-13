import type { Meta, StoryFn } from "@storybook/react";
import { PlayerProvider, PlayerContext } from ".";
import React, { useContext } from "react";

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
    const { isPlaying, play, pause } = useContext(PlayerContext);

    const track = {
        title: "Test title",
        artist: "Test artist",
        thumbnail: "test.jpg",
        audioUrl: "test.mp3",
    };

    return (
        <div>
            Player is {isPlaying ? "playing" : "paused"}
            <button onClick={() => (isPlaying ? pause() : play(track))}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};
