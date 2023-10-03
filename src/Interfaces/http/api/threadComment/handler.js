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
            id: threadId,
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
}

module.exports = ThreadCommentsHandler;
