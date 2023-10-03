const routes = (handler) => ([{
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
        auth: 'middleware',
    },
}]);

module.exports = routes;
