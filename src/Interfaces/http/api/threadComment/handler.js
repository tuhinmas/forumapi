/* eslint-disable max-len */
const autoBind = require('auto-bind');
const ThreadCommentUseCase = require("../../../../Applications/use_case/ThreadCommentUseCase");

class ThreadCommentsHandler {
    constructor(container) {
        this._container = container;

        /* auto bind all function */
        autoBind(this);
    }

    async postThreadCommentHandler(request, h) {
        const {
            content,
        } = request.payload;
        const {
            id: owner,
        } = request.auth.credentials;

        const {
            threadId,
        } = request.params;

        const addThreadCommentUseCase = this._container.getInstance(ThreadCommentUseCase.name);
        const addedComment = await addThreadCommentUseCase.addThreadComment({
            owner,
            threadId,
            content,
        });

        const response = h.response({
            status: 'success',
            data: {
                addedComment,
            },
        });
        response.code(201);
        return response;
    }

    async deleteThreadCommentHandler(request, h) {
        const {
            id: owner,
        } = request.auth.credentials;

        const {
            threadId,
            commentId,
        } = request.params;

        const deleteThreadCommentUseCase = this._container.getInstance(ThreadCommentUseCase.name);
        await deleteThreadCommentUseCase.deleteThreadComment({
            threadId,
            commentId,
            owner,
        });

        const response = h.response({
            status: 'success',
        });
        response.code(200);
        return response;
    }
}

module.exports = ThreadCommentsHandler;
