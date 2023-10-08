/* eslint-disable no-undef */
const DetailThread = require('../DetailThread');

describe('a DetailThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            title: 'dicodintitle',
            owner: 'owner id',
        };

        // Action and Assert
        expect(() => new DetailThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            title: 'title',
            owner: "owner",
            body: "body",
            date: "tanggal",
            username: "agus",
        };

        // Action and Assert
        expect(() => new DetailThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create detailThread object correctly', () => {
        // Arrange
        const payload = {
            id: "123",
            title: 'title',
            owner: "owner",
            body: "body",
            date: "2023-01-01 00:00:00",
            username: "agus",
        };

        // Action
        const detailThread = new DetailThread(payload);

        // Assert
        expect(detailThread.id).toEqual(payload.id);
        expect(detailThread.title).toEqual(payload.title);
        expect(detailThread.body).toEqual(payload.body);
        expect(detailThread.username).toEqual(payload.username);
        expect(detailThread.date).toEqual(payload.date);
    });
});
