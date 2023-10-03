/* eslint-disable no-undef */
const AddThreadComment = require("../AddThreadComment");

describe("a add thread comment entities", () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {};

        expect(() => new AddThreadComment(payload)).toThrowError('ADD_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            content: true,
            owner: "owner",
            threadId: "threadId",
        };

        // Action and Assert
        expect(() => new AddThreadComment(payload)).toThrowError('ADD_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
});
