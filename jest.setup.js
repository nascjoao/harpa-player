require("@testing-library/jest-dom");

// Audio mock
global.Audio = jest.fn().mockImplementation(() => ({
    pause: jest.fn(),
    play: jest.fn(),
    addEventListener: jest.fn(),
}));
