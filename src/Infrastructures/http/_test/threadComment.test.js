/* eslint-disable max-len */
/* eslint-disable no-undef */
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsCommentTableTestHelper = require("../../../../tests/ThreadCommentTableHelper");
const AuthenticationTestHelper = require("../../../../tests/AuthenticationTestHelper");
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads/{threadId}/comments endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    describe('when POST /threads/{threadId}/comments', () => {
        it('should response 201 and persisted comment', async () => {
            // Arrange
            const requestPayload = {
                content: 'content',
            };
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-123';
            await ThreadsTableTestHelper.addThread({
                threadId,
            });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadId}/comments`,
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedComment).toBeDefined();
        });

        it('should response 400 when request payload not contain needed property', async () => {
            // Arrange
            const requestPayload = {};
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-123';
            await ThreadsTableTestHelper.addThread({
                id: threadId,
            });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadId}/comments`,
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat komentar thread baru karena properti yang dibutuhkan tidak ada');
        });

        it('should response 400 when request payload not meet data type specification', async () => {
            // Arrange
            const requestPayload = {
                content: 123,
            };
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-123';
            await ThreadsTableTestHelper.addThread({
                id: threadId,
            });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadId}/comments`,
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat komentar thread baru karena tipe data tidak sesuai');
        });

        it('should response 404 when threadId is invalid', async () => {
            // Arrange
            const requestPayload = {
                content: 123,
            };
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-123';

            // Action
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadId}/comments`,
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('thread tidak ditemukan');
        });
    });

    describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
        it('should response 201 and delete comment successfully', async () => {
            // Arrange
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-123';
            await ThreadsTableTestHelper.addThread({
                id: threadId,
                title: "test",
                body: "test",
            });

            const user = await UsersTableTestHelper.findUsersByUsername("dicoding");
            const commentId = 'thread-comment-123';
            await ThreadsCommentTableTestHelper.addThreadComment({
                id: commentId,
                threadId,
                content: 'thread-test',
                owner: user[0].id,
            });

            // // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });

        it('should response 403 when user is not an authorized owner of the comment', async () => {
            // Arrange
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const anotherUserId = 'user-not-owner';
            await UsersTableTestHelper.addUser({
                id: anotherUserId,
                username: 'user-not-owner',
            });

            const threadId = 'thread-123';
            await ThreadsTableTestHelper.addThread({
                id: threadId,
            });

            const commentId = 'comment-123';
            await ThreadsCommentTableTestHelper.addThreadComment({
                id: commentId,
                threadId,
                content: 'thread-test',
                owner: anotherUserId,
            });

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(403);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat mengakses resource ini');
        });

        it('should response 404 when thread or comment does not exist', async () => {
            // Arrange
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-135';
            const commentId = 'comment-246';

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toBeDefined();
        });

        it('should response 404 when comment does not exist', async () => {
            // Arrange
            const server = await createServer(container);
            const token = await AuthenticationTestHelper.accessToken(server);

            const threadId = 'thread-123';
            await ThreadsTableTestHelper.addThread({
                id: threadId,
            });

            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/xxx`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toBeDefined();
        });
    });
});
