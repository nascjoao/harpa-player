import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { usePlayer, PlayerProvider } from "@harpa-player";
import * as DocBlock from "@storybook/blocks";

const meta: Meta = {
    title: "Examples/Simple Play-Pause-Stop",
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

export const Example: Story = () => {
    const track = {
        audioUrl:
            "https://www.no-copyright-music.com/wp-content/uploads/2021/09/Mellow.mp3",
    };
    const { isPlaying, resume, pause, stop, load } = usePlayer(track);

    return (
        <div className="grid gap-4 min-w-40">
            <div className="flex items-center gap-2 min-h-6">
                {isPlaying && (
                    <>
                        <span className="relative flex size-4">
                            <span className="motion-safe:animate-[ping_1s_ease-in_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="motion-safe:animate-[ping_1s_ease-in_300ms_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full w-full h-full bg-emerald-400"></span>
                        </span>
                        <span>Playing</span>
                    </>
                )}
            </div>
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
        </div>
    );
};

Example.parameters = {
    docs: {
        page: () => (
            <>
                <DocBlock.Title />
                <p>
                    This example shows how to create a simple play-pause-stop
                    player using the <code>usePlayer</code> hook.
                </p>
                <ul>
                    <li>
                        Click on the <code>Play</code> button to start playing
                        the audio. The button will change to <code>Pause</code>.
                        Clicking on the <code>Pause</code> button will pause the
                        audio. If the audio is paused, clicking on the{" "}
                        <code>Play</code> button will resume the audio.
                    </li>
                    <li>
                        Click on the <code>Stop</code> button to stop the audio.
                        The audio will be stopped and the player will be reset.
                        Clicking on the <code>Play</code> button will start the
                        audio from the beginning.
                    </li>
                </ul>
                <p>See below the functional implementation:</p>
                <div className="max-w-8">
                    <DocBlock.Story />
                </div>
                <h2 className="!mt-[2.5rem]">
                    How to reproduce this example in your project?
                </h2>
                <p>
                    Wrap the component you want to use the player with the
                    PlayerProvider component. e.g.: if you want to use the
                    player in the whole application, wrap the App component with
                    the PlayerProvider. This will make the player available in
                    the whole application even if you navigate to different
                    routes.
                </p>
                <DocBlock.Source
                    code={`import { PlayerProvider } from "harpa-player";

function App() {
    return (
        <PlayerProvider>
            {/* Your app components */}
        </PlayerProvider>
    );
}`}
                />
                <p>
                    Import the <code>usePlayer</code> hook from the{" "}
                    <code>harpa-player</code> package where you want to consume
                    the player.
                </p>
                <DocBlock.Source
                    code={`import { usePlayer } from "harpa-player";`}
                />
                <div className="bg-amber-500 bg-opacity-10 p-2 px-4 rounded-md border-l-4 border-l-amber-500">
                    <p>
                        Note: The <code>usePlayer</code> is a hook to interact
                        with the player. It returns the player state and methods
                        to control it.
                    </p>
                    <p>
                        You can create elements the way you want to control the
                        player.
                    </p>
                    <p>
                        To keep the example simple, the styles are not mentioned
                        here. The focus is on the functionality.
                    </p>
                </div>
                <p>
                    Create a track object with the audio URL you want to play.
                </p>
                <DocBlock.Source
                    code={`const track = {
    audioUrl: "https://www.example.com/audio.mp3",
};`}
                />
                <p>
                    Use the <code>usePlayer</code> hook to get the player state
                    and methods. The track object is passed as an argument to
                    initialize the player with the track.
                </p>
                <DocBlock.Source
                    code={`const { isPlaying, resume, pause, stop, load } = usePlayer(track);`}
                />
                <p>
                    Create elements to control the player. For example, create a
                    button to play or pause the audio.
                </p>
                <DocBlock.Source
                    code={`<button onClick={() => (isPlaying ? pause() : resume())}>
    {isPlaying ? "Pause" : "Play"}
</button>`}
                />
                <p>
                    Create a button to stop the audio. When the audio is
                    stopped, the player will be reset. You can load a new track
                    to play.
                </p>
                <DocBlock.Source
                    code={`<button onClick={() => {
    stop(() => load(track));
}}>
    Stop
</button>`}
                />
                <div className="bg-amber-500 bg-opacity-10 p-2 px-4 rounded-md border-l-4 border-l-amber-500">
                    <p>
                        Note: The <code>stop</code> method takes a callback
                        function as an argument. The callback function will be
                        called after the player is stopped. You can load a new
                        track to play in the callback function.
                    </p>
                    <p>
                        This is important because you need to ensure that the
                        player is stopped before loading a new track. Otherwise,
                        the player will throw an error.
                    </p>
                </div>

                <p className="!text-lg !mt-8">
                    🎉 Great! You have created a simple play-pause-stop player
                    using the <code>usePlayer</code> hook. You can customize the
                    player as per your requirements.
                </p>
            </>
        ),
    },
};
