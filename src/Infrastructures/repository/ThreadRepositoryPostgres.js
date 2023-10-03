const ThreadRepository = require("../../Domains/threads/ThreadRepository");
const AddedThread = require("../../Domains/threads/entities/AddedThread");
const DetailThread = require("../../Domains/threads/entities/DetailThread");

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addThread(addThread) {
        const {
            title,
            body,
            owner,
        } = addThread;
        const id = `thread-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, owner',
            values: [id, owner, title, body],
        };

        const result = await this._pool.query(query);

        return new AddedThread({
            ...result.rows[0],
        });
    }

    async getThreadById(id) {
        const query = {
            text: `select t.*, u.username  from threads t where id = $1
                    join users u on u.id = t.owner`,
            values: [id],
        };

        const result = await this._pool.query(query);

        return new DetailThread({
            ...result.rows[0],
        });
    }
}

module.exports = ThreadRepositoryPostgres;
