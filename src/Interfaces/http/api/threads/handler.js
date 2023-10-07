const autoBind = require('auto-bind');
const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const ShowThreadByIdUseCase = require("../../../../Applications/use_case/ShowThreadByIdUseCase");

class ThreadsHandler {
    constructor(container) {
        this._container = container;

        /* auto bind all function */
        autoBind(this);
    }

    async postThreadHandler(request, h) {
        const {
            title,
            body,
        } = request.payload;
        const {
            id: owner,
        } = request.auth.credentials;

        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
        const addedThread = await addThreadUseCase.execute({
            title,
            body,
            owner,
        });

        const response = h.response({
            status: 'success',
            data: {
                addedThread,
            },
        });
        response.code(201);
        return response;
    }

    async getThreadByIdHandler(request, h) {
        const {
            threadId,
        } = request.params;
        const showThreadByIdUseCase = this._container.getInstance(ShowThreadByIdUseCase.name);
        const detailThread = await showThreadByIdUseCase.execute(threadId);

        const response = h.response({
            status: 'success',
            data: {
                thread: detailThread,
            },
        });
        response.code(200);
        return response;
    }
}

module.exports = ThreadsHandler;
