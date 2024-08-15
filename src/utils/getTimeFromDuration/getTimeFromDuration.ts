export default function getTimeFromDuration(
    duration: number | null,
    timePattern: string,
): string {
    duration = duration ?? 0;
    const blocksPattern = /(hh?|mm?|ss?|\[[^\]]+\])/gi;
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
        if (block.startsWith("[") && block.endsWith("]")) {
            return block.slice(1, -1);
        }
        const blockKey = block[0].toLowerCase();
        const blockValue = time[blockKey];
        return blockValue.toString().padStart(block.length, "0");
    });
}
