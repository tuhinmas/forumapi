/* eslint-disable no-undef */
const AddedThreadComment = require("../AddedThreadComment");

describe("a added thread comment entities", () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {};

        expect(() => new AddedThreadComment(payload)).toThrowError('ADDED_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: "id-1",
            content: true,
            owner: "owner",
        };

        // Action and Assert
        expect(() => new AddedThreadComment(payload)).toThrowError('ADDED_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
});
