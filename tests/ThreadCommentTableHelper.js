/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const userHelper = require('./UsersTableTestHelper');

const ThreadsTableTestHelper = {
    async addThreadComment({
        id = 'thread-123',
        threadId = "test",
        content = 'thread-test',
    }) {
        const owner = await userHelper.addUser();
        const userId = owner.id;
        const query = {
            text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4)',
            values: [id, userId, threadId, content],
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

module.exports = ThreadsTableTestHelper;
