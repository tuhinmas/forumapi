/* eslint-disable no-restricted-globals */
class DetailThread {
    constructor(payload) {
        this._verifyPayload(payload);
        const {
            id,
            title,
            body,
            date,
            username,
        } = payload;

        this.id = id;
        this.title = title;
        this.body = body;
        this.date = date;
        this.username = username;
    }

    _verifyPayload({
        id,
        title,
        body,
        date,
        username,
    }) {
        if (!id || !title || !body || !date || !username) {
            throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        const dateCheck = new Date(date);
        if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof username !== 'string' || (dateCheck instanceof Date && isNaN(dateCheck))) {
            throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = DetailThread;
