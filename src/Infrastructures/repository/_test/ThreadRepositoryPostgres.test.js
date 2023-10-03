/* eslint-disable no-undef */
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UserTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");
const pool = require('../../database/postgres/pool');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await UserTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {
        it('should persist addThread and return addedThread correctly', async () => {
            // Arrange
            await UserTableTestHelper.addUser({
                id: "user-thread",
                username: 'threds-owner',
                password: 'secret_password',
            });

            const user = await UserTableTestHelper.findUsersById('user-thread');
            const userId = user[0].id;

            const addthread = new AddThread({
                title: 'dicoding',
                body: 'secret_password',
                owner: userId,
            });
            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await threadRepositoryPostgres.addThread(addthread);

            // Assert
            const thread = await ThreadsTableTestHelper.findThreadsById('thread-123');
            expect(thread).toHaveLength(1);
        });

        it('should return added thread correctly', async () => {
            // Arrange
            await UserTableTestHelper.addUser({
                id: "user-thread",
                username: 'threds-owner',
                password: 'secret_password',
            });

            const user = await UserTableTestHelper.findUsersById('user-thread');
            const userId = user[0].id;

            const addthread = new AddThread({
                title: 'dicoding',
                body: 'body',
                owner: userId,
            });

            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const addedThread = await threadRepositoryPostgres.addThread(addthread);

            // Assert
            expect(addedThread).toStrictEqual(new AddedThread({
                id: 'thread-123',
                title: 'dicoding',
                owner: 'user-thread',
            }));
        });
    });
});
