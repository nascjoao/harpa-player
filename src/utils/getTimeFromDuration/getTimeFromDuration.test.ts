import getTimeFromDuration from ".";

describe("getTimeFromDuration", () => {
    it("should throw an error when timePattern does not contain any block", () => {
        expect(() => getTimeFromDuration(0, "")).toThrow(
            /^The time pattern "" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".$/,
        );
    });

    it('should return "00:00" when duration is 0', () => {
        expect(getTimeFromDuration(0, "mm:ss")).toBe("00:00");
    });

    it('should return "00:01" when duration is 1', () => {
        expect(getTimeFromDuration(1, "mm:ss")).toBe("00:01");
    });

    it('should return "00:1" when duration is 1 and timePattern is "mm:s"', () => {
        expect(getTimeFromDuration(1, "mm:s")).toBe("00:1");
    });

    it('should return "01:01" when duration is 61', () => {
        expect(getTimeFromDuration(61, "mm:ss")).toBe("01:01");
    });

    it("should be possible to use different separators", () => {
        expect(getTimeFromDuration(61, "mm-ss")).toBe("01-01");
        expect(getTimeFromDuration(61, "mm:ss")).toBe("01:01");
        expect(getTimeFromDuration(61, "mm ss")).toBe("01 01");
        expect(getTimeFromDuration(61, "mm/ss")).toBe("01/01");
    });

    it('should return "01:01:01" when duration is 3661 and timePattern is "hh:mm:ss"', () => {
        expect(getTimeFromDuration(3661, "hh:mm:ss")).toBe("01:01:01");
    });

    it('should return "1:1:1" when duration is 3661 and timePattern is "h:m:s"', () => {
        expect(getTimeFromDuration(3661, "h:m:s")).toBe("1:1:1");
    });

    it('should be possible to mix blocks and return "05:15" when timePattern is "ss:mm" and duration is 905', () => {
        expect(getTimeFromDuration(905, "ss:mm")).toBe("05:15");
    });

    it('should be case insensitive and return "01:01" when timePattern is "MM:SS" and duration is 61', () => {
        expect(getTimeFromDuration(61, "MM:SS")).toBe("01:01");
    });

    it("should escape blocks with square brackets", () => {
        expect(getTimeFromDuration(61, "Ti[m]e: mm:ss")).toBe("Time: 01:01");
        expect(getTimeFromDuration(61, "Ti[mmmmm]e: mm:ss")).toBe(
            "Timmmmme: 01:01",
        );
        expect(getTimeFromDuration(61, "Ti[m]e: [mm:ss]")).toBe("Time: mm:ss");
    });
});
