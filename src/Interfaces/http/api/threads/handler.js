const autoBind = require('auto-bind');
const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");

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
}

module.exports = ThreadsHandler;
