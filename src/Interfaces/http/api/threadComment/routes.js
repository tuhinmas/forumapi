const routes = (handler) => ([{
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postThreadCommentHandler,
    options: {
        auth: 'middleware',
    },
}]);

module.exports = routes;
