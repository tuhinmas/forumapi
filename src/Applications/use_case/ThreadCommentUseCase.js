const AddThreadComment = require("../../Domains/threadComments/entities/AddThreadComment");

class ThreadCommentUseCase {
    constructor({
        threadCommentRepository,
        threadRepository,
    }) {
        this._threadCommentRepository = threadCommentRepository;
        this._threadRepository = threadRepository;
    }

    async addThreadComment(useCasePayload) {
        const { threadId } = useCasePayload;
        await this._threadRepository.getThreadById(threadId);
        const newThreadComment = new AddThreadComment(useCasePayload);
        return this._threadCommentRepository.addThreadComment(newThreadComment);
    }

    async deleteThreadComment(useCasePayload) {
        const { threadId, commentId, owner } = useCasePayload;
        await this._threadRepository.getThreadById(threadId);
        await this._threadCommentRepository.getThreadCommentById(commentId);
        await this._threadCommentRepository.verifyThreadCommentOwner(commentId, owner);

        await this._threadCommentRepository.deleteCommentById(commentId);
    }

    // async getThreadCommentByThreadId(useCasePayload) {
    //     const newThreadComment = new AddThreadComment(useCasePayload);
    //     return this._threadRepository.addThreadComment(newThreadComment);
    // }
}

module.exports = ThreadCommentUseCase;
