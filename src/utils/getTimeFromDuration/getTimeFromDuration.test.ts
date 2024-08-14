import getTimeFromDuration from ".";

describe("getTimeFromDuration", () => {
    it("should throw an error when timePattern does not contain any block", () => {
        expect(() => getTimeFromDuration("", 0)).toThrow(
            /^The time pattern "" must contain at least one of the following blocks: "h", "hh", "m", "mm", "s" or "ss".$/,
        );
    });

    it('should return "00:00" when duration is 0', () => {
        expect(getTimeFromDuration("mm:ss", 0)).toBe("00:00");
    });

    it('should return "00:01" when duration is 1', () => {
        expect(getTimeFromDuration("mm:ss", 1)).toBe("00:01");
    });

    it('should return "00:1" when duration is 1 and timePattern is "mm:s"', () => {
        expect(getTimeFromDuration("mm:s", 1)).toBe("00:1");
    });

    it('should return "01:01" when duration is 61', () => {
        expect(getTimeFromDuration("mm:ss", 61)).toBe("01:01");
    });

    it("should be possible to use different separators", () => {
        expect(getTimeFromDuration("mm-ss", 61)).toBe("01-01");
        expect(getTimeFromDuration("mm:ss", 61)).toBe("01:01");
        expect(getTimeFromDuration("mm ss", 61)).toBe("01 01");
        expect(getTimeFromDuration("mm/ss", 61)).toBe("01/01");
    });

    it('should return "01:01:01" when duration is 3661 and timePattern is "hh:mm:ss"', () => {
        expect(getTimeFromDuration("hh:mm:ss", 3661)).toBe("01:01:01");
    });

    it('should return "1:1:1" when duration is 3661 and timePattern is "h:m:s"', () => {
        expect(getTimeFromDuration("h:m:s", 3661)).toBe("1:1:1");
    });

    it('should be possible to mix blocks and return "05:15" when timePattern is "ss:mm" and duration is 905', () => {
        expect(getTimeFromDuration("ss:mm", 905)).toBe("05:15");
    });

    it('should be case insensitive and return "01:01" when timePattern is "MM:SS" and duration is 61', () => {
        expect(getTimeFromDuration("MM:SS", 61)).toBe("01:01");
    });
});
