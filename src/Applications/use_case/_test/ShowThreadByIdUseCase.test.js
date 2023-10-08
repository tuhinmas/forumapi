/* eslint-disable max-len */
/* eslint-disable no-undef */
const ShowThreadByIdUseCase = require('../ShowThreadByIdUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ThreadCommentRepository = require('../../../Domains/threadComments/ThreadCommentRepository');

describe('ShowThreadUseCase', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it('should orchestrating the show thread action correctly', async () => {
        // Arrange
        const useCasePayload = 'thread-123';
        const expectedThread = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            username: 'user-123',
            date: '2023-10-07T07:26:17.018Z',
        };
        const expectedComments = [{
                id: 'thread-comment-123',
                username: 'user-123',
                date: '2023-10-08T07:26:17.018Z',
                content: 'Comment Content',
                is_deleted: false,
            },
            {
                id: 'thread-comment-124',
                username: 'user-123',
                date: '2023-10-08T07:26:17.018Z',
                content: 'Comment Content 2',
                is_deleted: true,
            },
        ];

        const expectedShownThread = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            date: '2023-10-07T07:26:17.018Z',
            username: 'user-123',
            comments: [{
                    id: 'thread-comment-123',
                    username: 'user-123',
                    date: '2023-10-08T07:26:17.018Z',
                    content: 'Comment Content',
                },
                {
                    id: 'thread-comment-124',
                    username: 'user-123',
                    date: '2023-10-08T07:26:17.018Z',
                    content: '**komentar telah dihapus**',
                },
            ],
        };

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();
        const mockThreadCommentRepository = new ThreadCommentRepository();

        /** mocking needed function */
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedThread));

        mockThreadCommentRepository.getThreadCommentByThreadId = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedComments));

        /** creating use case instance */
        const showThreadUseCase = new ShowThreadByIdUseCase({
            threadRepository: mockThreadRepository,
            threadCommentRepository: mockThreadCommentRepository,
        });

        // Action
        const shownThread = await showThreadUseCase.execute(useCasePayload);

        // Assert
        expect(shownThread).toStrictEqual(expectedShownThread);
        expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload);
        expect(mockThreadCommentRepository.getThreadCommentByThreadId).toBeCalledWith(useCasePayload);
    });
});
