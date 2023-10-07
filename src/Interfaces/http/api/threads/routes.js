const routes = (handler) => ([{
        method: 'POST',
        path: '/threads',
        handler: handler.postThreadHandler,
        options: {
            auth: 'middleware',
        },
    },
    {
        method: 'GET',
        path: '/threads/{threadId}',
        handler: handler.getThreadByIdHandler,
    },
]);

module.exports = routes;
