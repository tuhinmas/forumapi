/* eslint-disable max-len */
/* eslint-disable no-undef */
const ThreadCommentRepository = require("../../../Domains/threadComments/ThreadCommentRepository");
const AddThreadComment = require("../../../Domains/threadComments/entities/AddThreadComment");
const AddedThreadComment = require("../../../Domains/threadComments/entities/AddedThreadComment");
const ThreadCommentUseCase = require('../ThreadCommentUseCase');

describe('AddThreadUseCase', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            content: 'content',
            owner: "owner",
            threadId: "threadId",
        };

        const mockAddedThreadComment = new AddedThreadComment({
            id: 'thread-comment-123',
            content: 'content',
            owner: "owner",
        });

        /** creating dependency of use case */
        const mockThreadCommentRepository = new ThreadCommentRepository();

        /** mocking needed function */
        mockThreadCommentRepository.addThreadComment = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAddedThreadComment));

        /** creating use case instance */
        const getThreadUseCase = new ThreadCommentUseCase({
            threadCommentRepository: mockThreadCommentRepository,
        });

        // Action
        const addedThreadComment = await getThreadUseCase.addThreadComment(useCasePayload);

        // Assert
        expect(addedThreadComment).toStrictEqual(new AddedThreadComment({
            id: 'thread-comment-123',
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        }));

        expect(mockThreadCommentRepository.addThreadComment).toHaveBeenCalledWith(new AddThreadComment({
            content: useCasePayload.content,
            owner: useCasePayload.owner,
            threadId: useCasePayload.threadId,
        }));
    });
});
