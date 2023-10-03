const AddThreadComment = require("../../Domains/threadComments/entities/AddThreadComment");

class ThreadCommentUseCase {
    constructor({
        threadCommentRepository,
    }) {
        this._threadCommentRepository = threadCommentRepository;
    }

    async addThreadComment(useCasePayload) {
        const newThreadComment = new AddThreadComment(useCasePayload);
        return this._threadCommentRepository.addThreadComment(newThreadComment);
    }

    // async deleteThreadComment(id) {
    //     const newThreadComment = new AddThreadComment(useCasePayload);
    //     return this._threadRepository.addThreadComment(newThreadComment);
    // }

    // async getThreadCommentByThreadId(useCasePayload) {
    //     const newThreadComment = new AddThreadComment(useCasePayload);
    //     return this._threadRepository.addThreadComment(newThreadComment);
    // }
}

module.exports = ThreadCommentUseCase;
