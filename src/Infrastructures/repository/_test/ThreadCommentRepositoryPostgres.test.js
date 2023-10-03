/* eslint-disable max-len */
/* eslint-disable no-undef */
const ThreadCommentTableHelper = require("../../../../tests/ThreadCommentTableHelper");
const UserTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const ThreadCommentRepositoryPostgres = require("../ThreadCommentRepositoryPostgres");
const AddThreadComment = require("../../../Domains/threadComments/entities/AddThreadComment");
const AddedThreadComment = require("../../../Domains/threadComments/entities/AddedThreadComment");
const pool = require('../../database/postgres/pool');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadCommentTableHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await UserTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThreadComment function', () => {
        it('should persist addThreadComment and return addedThreadComment correctly', async () => {
            await ThreadsTableTestHelper.addThread({
                id: 'thread-123',
                title: 'thread-test',
                body: 'Ini adalah thread',
            });

            const {
                owner,
                id: threadId,
            } = (await ThreadsTableTestHelper.findThreadsById("thread-123"))[0];

            const addThreadComment = new AddThreadComment({
                owner,
                threadId,
                content: 'dicoding',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const threadCommentRepositoryPostgres = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await threadCommentRepositoryPostgres.addThreadComment(addThreadComment);

            // Assert
            const threadComment = await ThreadCommentTableHelper.findThreadCommentById('thread-comment-123');
            expect(threadComment).toHaveLength(1);
        });

        it('should return added thread correctly', async () => {
            await ThreadsTableTestHelper.addThread({
                id: 'thread-123',
                title: 'thread-test',
                body: 'Ini adalah thread',
            });

            const {
                owner,
                id: threadId,
            } = (await ThreadsTableTestHelper.findThreadsById("thread-123"))[0];

            const addThreadComment = new AddThreadComment({
                owner,
                threadId,
                content: 'dicoding',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const threadCommentRepositoryPostgres = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const addedThreadComment = await threadCommentRepositoryPostgres.addThreadComment(addThreadComment);

            // Assert
            expect(addedThreadComment).toStrictEqual(new AddedThreadComment({
                id: 'thread-comment-123',
                content: 'dicoding',
                owner: 'user-thread',
            }));
        });
    });
});
