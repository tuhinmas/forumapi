const ThreadCommentRepository = require("../../Domains/threadComments/ThreadCommentRepository");
const AddedThreadComment = require("../../Domains/threadComments/entities/AddedThreadComment");

class ThreadCommentRepositoryPostgres extends ThreadCommentRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addThreadComment(payload) {
        const {
            owner,
            threadId,
            content,
        } = payload;
        const id = `thread-comment-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4) RETURNING id, content, owner',
            values: [id, owner, threadId, content],
        };

        const result = await this._pool.query(query);
        return new AddedThreadComment({
            ...result.rows[0],
        });
    }
}

module.exports = ThreadCommentRepositoryPostgres;
