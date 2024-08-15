import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { usePlayer, PlayerProvider, getTimeFromDuration } from "@harpa-player";
import * as DocBlock from "@storybook/blocks";

const meta: Meta = {
    title: "Examples/Handling Durations",
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

export const Example: Story = (props) => {
    const track = {
        title: "Mellow",
        artist: "Liborio Conti",
        audioUrl:
            "https://www.no-copyright-music.com/wp-content/uploads/2021/09/Mellow.mp3",
    };
    const {
        isPlaying,
        resume,
        pause,
        stop,
        load,
        currentTime,
        duration,
        currentTrack,
    } = usePlayer(track);

    return (
        <div className="grid gap-4 min-w-40">
            <strong>{currentTrack?.title}</strong>
            <span>{currentTrack?.artist}</span>
            <div className="grid [grid-template-columns:3fr_1fr] gap-2">
                <button
                    className="border px-3 py-1 rounded-md bg-neutral-50"
                    onClick={() => (isPlaying ? pause() : resume())}
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                    className="border px-3 py-1 rounded-md bg-neutral-50"
                    onClick={() => {
                        stop(() => load(track));
                    }}
                >
                    Stop
                </button>
            </div>
            <div className="flex justify-between">
                <span>
                    {/* @ts-ignore */}
                    {getTimeFromDuration(currentTime, props["Time format"])}
                </span>
                <span>
                    {/* @ts-ignore */}
                    {getTimeFromDuration(duration, props["Time format"])}
                </span>
            </div>
        </div>
    );
};

Example.args = {
    // @ts-ignore
    "Time format": "mm:ss",
};

Example.parameters = {
    docs: {
        page: () => (
            <>
                <DocBlock.Title />
                <p>
                    From <code>usePlayer</code> hook you can get the current
                    time and duration of the audio. These values are in seconds.
                </p>
                <p>
                    You can use the <code>getTimeFromDuration</code> util
                    function to convert the duration in seconds to a
                    human-readable format.
                </p>
                <p>
                    The function takes two arguments: the duration in seconds
                    and the time pattern. The time pattern is a string that can
                    contain the following blocks:
                </p>
                <ul>
                    <li>
                        <code>h</code>: hours
                    </li>
                    <li>
                        <code>hh</code>: hours with leading zero
                    </li>
                    <li>
                        <code>m</code>: minutes
                    </li>
                    <li>
                        <code>mm</code>: minutes with leading zero
                    </li>
                    <li>
                        <code>s</code>: seconds
                    </li>
                    <li>
                        <code>ss</code>: seconds with leading zero
                    </li>
                </ul>
                <p>
                    The function returns a string with the duration in the
                    specified format.
                </p>
                <p>
                    In the example below, the current time and duration are
                    displayed in the format <code>mm:ss</code>.
                </p>
                <div className="max-w-8">
                    <DocBlock.Story />
                </div>
                <h2 className="!mt-[2.5rem]">How to reproduce this example?</h2>
                <p>
                    This will cover only the time formatting part. You can refer
                    to the Simple Play-Pause-Stop example to create the player.
                </p>
                <p>
                    Import the <code>currentTime</code> and{" "}
                    <code>duration</code>
                    from the <code>usePlayer</code> hook.
                </p>
                <DocBlock.Source
                    code={`const { currentTime, duration } = usePlayer(track);`}
                />
                <div className="bg-amber-500 bg-opacity-10 p-2 px-4 rounded-md border-l-4 border-l-amber-500">
                    <p>
                        Reminder: The <code>track</code> object should have the
                        audio URL you want to play.
                        <br />
                        <br />
                        Also, the <code>usePlayer</code> hook should be wrapped
                        in the <code>PlayerProvider</code> component to be able
                        to consume the player state and methods.
                    </p>
                </div>
                <p>
                    Import the <code>getTimeFromDuration</code> util function.
                </p>
                <DocBlock.Source
                    code={`import { getTimeFromDuration } from "harpa-player";`}
                />
                <p>
                    Use the <code>getTimeFromDuration</code> function to convert
                    the duration in seconds to a human-readable format.
                </p>
                <p>
                    In this scenario, the current time and duration are
                    displayed in the format <code>mm:ss</code>.
                </p>
                <DocBlock.Source
                    code={`<span>
    {getTimeFromDuration(currentTime, "mm:ss")}
</span>
<span>
    {getTimeFromDuration(duration, "mm:ss")}
</span>`}
                />
                <p>
                    You can customize the time format as per your requirements.
                </p>
                <p>
                    If needed, you can escape a block by using square brackets.
                    For example, <code>Time: mm:ss</code> would not work as
                    expected. Instead, use <code>Ti[m]e: mm:ss</code>.
                </p>
                <p className="!text-lg !mt-8">
                    🎉 Great! You have learned how to handle durations with
                    Harpa Player.
                </p>
            </>
        ),
    },
};
