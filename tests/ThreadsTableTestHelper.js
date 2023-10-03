/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const userHelper = require('./UsersTableTestHelper');

const ThreadsTableTestHelper = {
    async addThread({
        id = 'thread-123',
        title = 'thread-test',
        body = 'Ini adalah thread',
    }) {
        await userHelper.addUser({
            id: "user-thread",
            username: 'threds-owner',
            password: 'secret_password',
        });

        const user = await userHelper.findUsersById("user-thread");
        const owner = user[0].id;

        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
            values: [id, owner, title, body],
        };

        const result = await pool.query(query);
        return result.rows[0];
    },

    async findThreadsById(id) {
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM threads WHERE 1=1');
    },
};

module.exports = ThreadsTableTestHelper;
