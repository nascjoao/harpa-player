export default function getTimeFromDuration(
    timePattern: string,
    duration: number,
): string {
    const blocksPattern = /(hh?|mm?|ss?)/gi;
    const thereAreNoBlocks = timePattern.match(blocksPattern) === null;

    if (thereAreNoBlocks) {
        throw new Error(
            `The time pattern "${timePattern}" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".`,
        );
    }

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60) % 60;
    const seconds = Math.floor(duration % 60);
    const time: Record<string, number> = {
        h: hours,
        m: minutes,
        s: seconds,
    };
    return timePattern.replace(blocksPattern, (block) => {
        const blockKey = block[0].toLowerCase();
        const blockValue = time[blockKey];
        return blockValue.toString().padStart(block.length, "0");
    });
}
