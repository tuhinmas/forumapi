const ThreadCommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'threadComments',
    register: async (server, {
        container,
    }) => {
        const threadsHandler = new ThreadCommentsHandler(container);
        server.route(routes(threadsHandler));
    },
};
