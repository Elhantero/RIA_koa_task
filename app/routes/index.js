const Router = require('koa-router'),
    KoaBody = require('koa-body'),
    { getId, list, createItem, updateItem, removeItem, getGoods, setGoods, delGoods } = require('../controllers/indexController');

const router = new Router();

router
    .get('/users', list)
    .get('/users/:id', getId)

    .get('/goods/:id', getGoods)
    .post('/goods/', KoaBody(), setGoods)
    .delete('/goods/:id', delGoods)

    .post('/users/', KoaBody(), createItem)
    .put('/users/:id', KoaBody(), updateItem)
    .delete('/users/:id', removeItem);

module.exports = {
    routes() { return router.routes() },
    allowedMethods() { return router.allowedMethods() }
};
