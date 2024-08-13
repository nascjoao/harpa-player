import Player from ".";
import { render } from "@testing-library/react";

describe("Player", () => {
    it("should have the text 'Player'", () => {
        const { getByText } = render(<Player />);
        expect(getByText("Player")).toBeInTheDocument();
    });
});
