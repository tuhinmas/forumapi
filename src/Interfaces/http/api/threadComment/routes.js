const routes = (handler) => ([{
        method: 'POST',
        path: '/threads/{threadId}/comments',
        handler: handler.postThreadCommentHandler,
        options: {
            auth: 'middleware',
        },
    },
    {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}',
        handler: handler.deleteThreadCommentHandler,
        options: {
            auth: 'middleware',
        },
    },
]);

module.exports = routes;
