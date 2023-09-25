/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('thread_comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade',
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: '"threads"',
            onDelete: 'cascade',
        },
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        content: {
            type: "TEXT",
            notNull: true
        },
        deleted_at: {
            type: 'timestamp',
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable("thread_comments");
};