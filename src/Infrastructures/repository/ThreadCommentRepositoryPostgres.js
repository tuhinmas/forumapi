const ThreadCommentRepository = require("../../Domains/threadComments/ThreadCommentRepository");
const AddedThreadComment = require("../../Domains/threadComments/entities/AddedThreadComment");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");

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

    async getThreadCommentById(commentId) {
        const query = {
            text: 'SELECT * FROM thread_comments WHERE id = $1',
            values: [commentId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('komentar tidak ditemukan');
        }
    }

    async verifyThreadCommentOwner(commentId, owner) {
        const query = {
            text: 'SELECT * FROM thread_comments WHERE id = $1 AND owner = $2',
            values: [commentId, owner],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new AuthorizationError('tidak dapat mengakses resource ini');
        }
    }

    async deleteCommentById(commentId) {
        const query = {
            text: 'UPDATE thread_comments SET is_deleted = true, deleted_at = now() WHERE id = $1',
            values: [commentId],
        };

        await this._pool.query(query);
    }

    async getThreadCommentByThreadId(threadId) {
        const query = {
            text: `SELECT tc.id, users.username, tc.date, tc.content, tc.is_deleted
            FROM thread_comments tc
            INNER JOIN users ON tc.owner = users.id
            WHERE tc.thread_id = $1
            ORDER BY tc.date ASC
          `,
            values: [threadId],
        };

        const result = await this._pool.query(query);
        return result.rows;
    }
}

module.exports = ThreadCommentRepositoryPostgres;
