/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
class ShowThreadByIdUseCase {
    constructor({
        threadCommentRepository,
        threadRepository,
    }) {
        this._threadCommentRepository = threadCommentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(threadId) {
        const thread = await this._threadRepository.getThreadById(threadId);
        const threadComments = await this._threadCommentRepository.getThreadCommentsByThreadId(threadId);
        const validatedComments = this._mapComment(threadComments);

        return {
            ...thread,
            comments: validatedComments,
        };
    }

    _mapComment(comments) {
        // eslint-disable-next-line no-restricted-syntax
        comments.map((comment) => {
            if (comment.is_deleted) {
                comment.content = '**komentar telah dihapus**';
            }
            delete comment.is_deleted;
            return comment;
        });
        return comments;
    }
}

module.exports = ShowThreadByIdUseCase;
