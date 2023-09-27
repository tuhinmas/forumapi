/* eslint-disable no-undef */
const AddThread = require("../AddThread");

describe("a add threads entities", () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            body: "body",
        };

        expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            title: true,
            body: "body",
            owner: "owner",
        };

        // Action and Assert
        expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
});
