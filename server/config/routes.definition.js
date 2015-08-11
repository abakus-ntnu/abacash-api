module.exports = function() {

    var routes = {};

    // routes related to users
    routes.users = {
        getAll: '/api/users',
        getByRole: '/api/users/:role',
        getById: '/api/users/:id',
        getByUsername: '/api/users/username/:username',
        getByRFID: '/api/users/rfid/:rfid',
        searchByName: '/api/users/search/:name',
        updateUser: '/api/users/',
        addUser: '/api/users'
    };

    routes.products = {
        getActive: '/api/products',
        getAll: '/api/products/all',
        getById: '/api/products/:id',
        getByType: '/api/products/type/:type',
        updateProduct: '/api/products/:id',
        addProduct: '/api/products/',
        toggleActive: '/api/products/toggle/:id'
    };

    routes.transactions = {
        getAll: '/api/transactions',
        getById: '/api/transactions/:id',
        getForUserById: '/api/transactions/user/:id',
        getFromPeriod: '/api/transactions/period',
        addTransaction: '/api/transactions/'
    };

    routes.auth = {
        login: '/api/auth'
    };

};