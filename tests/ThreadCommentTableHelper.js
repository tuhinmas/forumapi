/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsCommentTableTestHelper = {
    async addThreadComment({
        id = 'thread-comment-123',
        threadId = "thread-123",
        content = 'thread-test',
        owner = "user-123",
    }) {
        const query = {
            text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4)',
            values: [id, owner, threadId, content],
        };

        await pool.query(query);
    },

    async findThreadCommentById(id) {
        const query = {
            text: 'SELECT * FROM thread_comments WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM thread_comments WHERE 1=1');
    },
};

module.exports = ThreadsCommentTableTestHelper;
