const AuthenticationTestHelper = {
    async accessToken(server) {
        // Arrange
        const userPayload = {
            username: 'dicoding',
            password: 'secret',
        };
        // add user
        await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: 'dicoding',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
            },
        });

        // Action
        const responseAuthentication = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: userPayload,
        });

        // Assert
        const {
            data,
        } = JSON.parse(responseAuthentication.payload);
        return data.accessToken;
    },
};

module.exports = AuthenticationTestHelper;
