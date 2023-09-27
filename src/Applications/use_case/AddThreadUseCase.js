const AddThread = require("../../Domains/threads/entities/AddThread");

class AddThreadUseCase {
    constructor({
        threadRepostory,
    }) {
        this._threadRepostory = threadRepostory;
    }

    async execute(useCasePayload) {
        const addThread = new AddThread(useCasePayload);
        return this._threadRepostory.addThread(addThread);
    }
}

module.exports = AddThreadUseCase;
